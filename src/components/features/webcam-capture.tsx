import { useState, useCallback, useRef } from "react";
import ReactWebcam from "react-webcam";
import { toast } from "react-hot-toast";

type WebcamCaptureProps = {
  onCapture: (imageSrc: string) => void;
};

export default function WebcamCapture({ onCapture }: WebcamCaptureProps) {
  const webcamRef = useRef<ReactWebcam>(null);

  const capture = useCallback(() => {
    const imgSrc = webcamRef.current?.getScreenshot({
      width: 1920,
      height: 1080,
    });
    if (imgSrc) onCapture(imgSrc);
  }, [webcamRef, onCapture]);

  const webcamError = () =>
    toast.error(
      "Could not access the webcam 😢 Please allow camera access or try uploading a photo instead",
      {
        duration: 6000,
        id: "webcam-error",
      }
    );
  const webcamSuccess = () =>
    toast.success("Webcam access granted! 🎉", {
      duration: 3000,
    });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1em",
      }}
    >
      <ReactWebcam
        audio={false}
        ref={webcamRef}
        onUserMedia={webcamSuccess}
        onUserMediaError={webcamError}
        videoConstraints={{
          width: 1920,
          height: 1080,
        }}
        screenshotQuality={1}
        style={{ width: "55%", height: "auto" }}
        imageSmoothing={false}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Take photo</button>
      {/* {imgSrc && <button onClick={capture}>Retake photo</button>} */}
      {/* {imgSrc && <button>Continue &#8594;</button>} */}
    </div>
  );
}
