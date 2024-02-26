import { useState, useCallback, useRef } from "react";
import ReactWebcam from "react-webcam";
import { toast } from "react-hot-toast";

const WebcamCapture = () => {
  const webcamRef = useRef<ReactWebcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot({
      width: 1920,
      height: 1080,
    });
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

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
      {imgSrc ? (
        <img
          src={imgSrc}
          alt="Captured"
          style={{ width: "55%", height: "auto" }}
        />
      ) : (
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
      )}
      {!imgSrc && <button onClick={capture}>Take photo</button>}
      {imgSrc && <button onClick={capture}>Retake photo</button>}
      {imgSrc && <button>Continue &#8594;</button>}
    </div>
  );
};

export default WebcamCapture;
