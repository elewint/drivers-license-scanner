import { useEffect, useState, useRef } from "react";
import cv from "@techstark/opencv-js";
import ImageSelector from "../common/image-selector";
import Tesseract from "tesseract.js";

const OpenCVTest = () => {
  const [isCvReady, setCvReady] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.value);
  };

  useEffect(() => {
    // Check if OpenCV is ready
    cv.onRuntimeInitialized = () => {
      console.log("OpenCV is ready");
      setCvReady(true);
    };
  }, []);

  const performEdgeDetection = () => {
    if (!selectedImage) {
      alert("Please select a license first.");
      return;
    }
    let imgElement = document.getElementById("imageSrc");
    let src = cv.imread(imgElement);
    let dst = new cv.Mat();
    let edges = new cv.Mat();
    // Double the image size
    let dsize = new cv.Size(src.cols * 2, src.rows * 2);
    // Use cubic interpolation for better quality
    cv.resize(src, dst, dsize, 0, 0, cv.INTER_CUBIC);

    // Convert the image to grayscale
    cv.cvtColor(dst, dst, cv.COLOR_RGB2GRAY, 0);

    // Apply Gaussian Blur to denoise
    cv.GaussianBlur(dst, dst, new cv.Size(3, 3), 0, 0);

    // Apply adaptive thresholding
    cv.adaptiveThreshold(
      dst,
      dst,
      255,
      cv.ADAPTIVE_THRESH_MEAN_C,
      cv.THRESH_BINARY,
      109,
      50
    );

    cv.imshow("canvasOutput", dst);

    // Perform Canny edge detection
    // cv.Canny(dst, edges, 50, 100, 3, false);
    // cv.imshow("canvasOutput", edges);

    src.delete();
    dst.delete();
    edges.delete();
  };

  const performOCR = () => {
    if (canvasRef.current) {
      // Convert the canvas to a data URL
      const canvasDataURL = canvasRef.current.toDataURL("image/png");

      // Run Tesseract OCR on the data URL
      Tesseract.recognize(canvasDataURL, "eng", {
        tessedit_pageseg_mode: 6, // Use the appropriate PSM mode here
        oem: 1,
        logger: (m) => console.log(m),
      })
        .then(({ data: { text, lines, words } }) => {
          console.log(text); // Here's your recognized text

          // Draw boxes around the text areas
          const ctx = canvasRef.current.getContext("2d");
          ctx.strokeStyle = "red";
          ctx.lineWidth = 2;
          ctx.font = "16px Arial";
          ctx.fillStyle = "red";

          words.forEach((word) => {
            const { x0, y0, x1, y1 } = word.bbox;
            ctx.beginPath();
            ctx.rect(x0, y0, x1 - x0, y1 - y0);
            ctx.stroke();

            // Display the detected word
            const detectedWord = word.text;
            const textWidth = ctx.measureText(detectedWord).width;
            ctx.fillText(detectedWord, x0, y1 + 16);
          });
        })
        .catch((error) => {
          console.error("OCR Error:", error);
        });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "10em",
      }}
    >
      {isCvReady ? (
        <>
          <ImageSelector onImageChange={handleImageChange} />
          {selectedImage && (
            <img
              id="imageSrc"
              alt="Selected preview image"
              src={selectedImage}
              style={{ maxWidth: "500px", height: "100%" }}
            />
          )}
          <button
            style={{
              backgroundColor: "green",
              width: "500px",
              height: "100px",
              marginBottom: "1em",
            }}
            onClick={performEdgeDetection}
          >
            Canny Edge
          </button>
          <button
            style={{
              backgroundColor: "blue",
              width: "500px",
              height: "100px",
              marginBottom: "1em",
            }}
            onClick={performOCR}
          >
            Run OCR
          </button>
          <canvas id="canvasOutput" ref={canvasRef}></canvas>
        </>
      ) : (
        <p>Loading OpenCV...</p>
      )}
    </div>
  );
};

export default OpenCVTest;
