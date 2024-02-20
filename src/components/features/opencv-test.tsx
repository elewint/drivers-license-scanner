import { useEffect, useState } from "react";
import testImage from "/test-image.jpeg";
import cv from "@techstark/opencv-js";

const OpenCVTest = () => {
  const [isCvReady, setCvReady] = useState(false);

  useEffect(() => {
    // Check if OpenCV is ready
    cv.onRuntimeInitialized = () => {
      console.log("OpenCV is ready");
      setCvReady(true);
    };
  }, []);

  const convertToGrayscale = () => {
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
          <img
            id="imageSrc"
            alt="Source"
            src={testImage}
            // onLoad={convertToGrayscale}
            style={{ maxWidth: "500px", height: "100%" }}
          />
        </>
      ) : (
        <p>Loading OpenCV...</p>
      )}
      <button
        style={{
          backgroundColor: "gray",
          width: "500px",
          height: "100px",
          marginBottom: "1em",
        }}
        onClick={convertToGrayscale}
      >
        Grayscale
      </button>
      <canvas id="canvasOutput"></canvas>
    </div>
  );
};

export default OpenCVTest;
