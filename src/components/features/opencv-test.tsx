import { useEffect, useState } from "react";
import testImage from "/1_CA.jpeg";
import cv from "@techstark/opencv-js";
import ImageSelector from "../common/image-selector";

const OpenCVTest = () => {
  const [isCvReady, setCvReady] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

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

  const convertToGrayscale = () => {
    if (!selectedImage) {
      alert("Please select a license first.");
      return;
    }
    if (isCvReady) {
      // Create an OpenCV image from an HTML element
      let imgElement = document.getElementById("imageSrc");
      let src = cv.imread(imgElement);
      let dst = new cv.Mat();

      // Convert the image to grayscale
      cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY, 0);

      // Display the processed image
      cv.imshow("canvasOutput", dst);

      // Clean up
      src.delete();
      dst.delete();
    }
  };

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
          <canvas id="canvasOutput"></canvas>
        </>
      ) : (
        <p>Loading OpenCV...</p>
      )}
    </div>
  );
};

export default OpenCVTest;
