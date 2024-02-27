import { useState } from "react";
import "./app.css";
import { useMediaQuery } from "react-responsive";
import WebcamCapture from "./components/features/webcam-capture";
import BarcodeScanner from "./components/features/barcode-scanner";

export default function App() {
  const [currentState, setCurrentState] = useState("initial");
  const [file, setFile] = useState<string | undefined>(undefined);
  const [isFirstCapture, setIsFirstCapture] = useState<boolean>(true);

  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setFile(event.target.result.toString());
          setCurrentState("fileUploaded");
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      e.target.value = "";
    }
  };

  const handleWebcamCapture = (imgSrc: string) => {
    setFile(imgSrc);
    setCurrentState("webcamCaptured");
    if (isFirstCapture) {
      setIsFirstCapture(false);
    }
  };

  return (
    <>
      <h1>Driver's License Scanner 📸 🪪</h1>
      <div className="photo-buttons">
        <input
          type="file"
          accept="image/jpeg, image/jpg, image/png"
          onChange={handleFileUpload}
          id="file-input"
        />
        {currentState === "initial" && (
          <label
            htmlFor="file-input"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const fileInput = document.getElementById(
                  "file-input"
                ) as HTMLInputElement;
                fileInput.click();
              }
            }}
          >
            Upload{!isDesktop && " or take"} photo
          </label>
        )}
        {isDesktop && currentState === "initial" && (
          <button onClick={() => setCurrentState("webcamSelected")}>
            Take photo with webcam
          </button>
        )}
        {(currentState === "fileUploaded" ||
          currentState === "webcamCaptured") &&
          file && <img src={file} alt="Uploaded image" />}
      </div>
      {currentState === "webcamSelected" && (
        <WebcamCapture
          onCapture={handleWebcamCapture}
          isFirstCapture={isFirstCapture}
        ></WebcamCapture>
      )}
      {currentState != "initial" && (
        <button
          onClick={() => {
            setFile(undefined);
            setCurrentState("initial");
          }}
        >
          &#8592; Back
        </button>
      )}
      {currentState === "webcamCaptured" && (
        <button
          onClick={() => {
            setFile(undefined);
            setCurrentState("webcamSelected");
          }}
        >
          Retake photo
        </button>
      )}
      {(currentState === "fileUploaded" ||
        currentState === "webcamCaptured") && (
        <BarcodeScanner imgSrc={file}></BarcodeScanner>
      )}
    </>
  );
}
