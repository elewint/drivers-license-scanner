import ReactWebcam from "react-webcam";
import { toast } from "react-hot-toast";

const Webcam = () => {
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
    <div>
      <ReactWebcam
        audio={false}
        onUserMedia={webcamSuccess}
        onUserMediaError={webcamError}
      />
    </div>
  );
};

export default Webcam;
