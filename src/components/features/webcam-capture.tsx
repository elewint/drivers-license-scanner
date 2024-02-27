import { useCallback, useRef } from "react";
import ReactWebcam from "react-webcam";
import { toast } from "react-hot-toast";

type WebcamCaptureProps = {
  onCapture: (imageSrc: string) => void;
  isFirstCapture: boolean;
};

export default function WebcamCapture({
  onCapture,
  isFirstCapture,
}: WebcamCaptureProps) {
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
  const webcamSuccess = () => {
    if (isFirstCapture) {
      toast.success("Webcam access granted! 🎉", {
        duration: 3000,
      });
    }
  };

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
    </div>
  );
}
