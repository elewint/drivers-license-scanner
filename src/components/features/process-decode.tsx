import React, { useRef, useState } from "react";
import { BrowserPDF417Reader } from "@zxing/browser";
import cv from "@techstark/opencv-js";

interface ProcessDecodeProps {
  src: string | undefined;
}

const ProcessDecode: React.FC<ProcessDecodeProps> = ({ src }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const preprocessAndDecode = async (src: string) => {
    const imgElement = document.createElement("img");
    imgElement.src = src;
    imgElement.onload = () => {
      const srcMat = cv.imread(imgElement);
      let dst = new cv.Mat();

      cv.cvtColor(srcMat, dst, cv.COLOR_RGBA2GRAY);

      // Halve the image size
      //   let dsize = new cv.Size(dst.cols / 2, dst.rows / 2);
      // cubic interpolation for better quality
      //   cv.resize(dst, dst, dsize, 0, 0, cv.INTER_CUBIC);

      cv.adaptiveThreshold(
        dst,
        dst,
        255,
        cv.ADAPTIVE_THRESH_MEAN_C,
        cv.THRESH_BINARY,
        109,
        50
      );

      const canvas = document.getElementById("canvas");
      if (canvas) {
        cv.imshow(canvas, dst);

        decodeBarcodeFromCanvas(canvas);
      }
    };
  };

  const decodeBarcodeFromCanvas = async (canvas: HTMLCanvasElement) => {
    const codeReader = new BrowserPDF417Reader();
    console.clear();
    try {
      const result = await codeReader.decodeFromCanvas(canvas);
      console.log("Decoded result:", result);
    } catch (error) {
      console.error("Error decoding barcode:", error);
    }
  };

  const handleButtonClick = () => {
    if (src) {
      preprocessAndDecode(src);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Process</button>
      <canvas id="canvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default ProcessDecode;
