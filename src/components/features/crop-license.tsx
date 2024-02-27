import cv from "@techstark/opencv-js";
import { useRef } from "react";

type CropLicenseProps = { src: string | undefined };

export default function CropLicense({ src }: CropLicenseProps) {
  const crop = (src: string) => {
    const imgElement = document.createElement("img");
    imgElement.src = src;
    imgElement.onload = () => {
      const srcMat = cv.imread(imgElement);

      // Convert to grayscale
      //   let grayMat = new cv.Mat();
      //   cv.cvtColor(srcMat, grayMat, cv.COLOR_RGBA2GRAY, 0);

      // Apply thresholding to highlight the white areas
      //   let dst = new cv.Mat();
      //   cv.threshold(grayMat, dst, 200, 255, cv.THRESH_BINARY);

      // Find contours
      //   let contours = new cv.MatVector();
      //   let hierarchy = new cv.Mat();
      //   cv.findContours(
      //     threshMat,
      //     contours,
      //     hierarchy,
      //     cv.RETR_CCOMP,
      //     cv.CHAIN_APPROX_SIMPLE
      //   );

      let gray = new cv.Mat();
      cv.cvtColor(srcMat, gray, cv.COLOR_RGBA2GRAY);

      let blurred = new cv.Mat();
      cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0, 0);

      let threshMat = new cv.Mat();
      cv.adaptiveThreshold(
        blurred,
        threshMat,
        255,
        cv.ADAPTIVE_THRESH_MEAN_C,
        cv.THRESH_BINARY,
        109,
        60
      );

      let edges = new cv.Mat();
      cv.Canny(threshMat, edges, 50, 100, 3, false);

      const canvas = document.getElementById("croppedCanvas");
      if (canvas) {
        cv.imshow(canvas, edges);
      }

      //   // Erode to remove small noises and detach connected objects
      //   let eroded = new cv.Mat();
      //   let erosionSize = new cv.Size(1, 1); // Adjust based on your specific image
      //   cv.erode(
      //     threshMat,
      //     eroded,
      //     cv.getStructuringElement(cv.MORPH_RECT, erosionSize)
      //   );

      //   // Dilate to restore the eroded parts of the rectangles
      //   let dilated = new cv.Mat();
      //   let dilationSize = new cv.Size(1, 1); // Adjust based on your specific image
      //   cv.dilate(
      //     eroded,
      //     dilated,
      //     cv.getStructuringElement(cv.MORPH_RECT, dilationSize)
      //   );

      //   let lines = new cv.Mat();
      //   cv.HoughLinesP(threshMat, lines, 1, Math.PI / 180, 50, 50, 10);

      //   for (let i = 0; i < lines.rows; i++) {
      //     let startPoint = new cv.Point(
      //       lines.data32S[i * 4],
      //       lines.data32S[i * 4 + 1]
      //     );
      //     let endPoint = new cv.Point(
      //       lines.data32S[i * 4 + 2],
      //       lines.data32S[i * 4 + 3]
      //     );
      //     cv.line(
      //       threshMat,
      //       startPoint,
      //       endPoint,
      //       [0, 255, 0, 255],
      //       2,
      //       cv.LINE_AA,
      //       0
      //     );
      //   }

      gray.delete();
      blurred.delete();
      threshMat.delete();
    };
  };

  const handleClick = () => {
    if (src) {
      crop(src);
    }
  };
  return (
    <div>
      <button onClick={handleClick}>Crop license</button>
      <canvas id="croppedCanvas"></canvas>
    </div>
  );
}
