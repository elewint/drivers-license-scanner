import { useState } from "react";
import "./app.css";
import { useMediaQuery } from "react-responsive";
import WebcamCapture from "./components/features/webcam-capture";

function App() {
  const [file, setFile] = useState<string | undefined>(undefined);
  const [webcam, setWebcam] = useState(false);

  const isDesktop = useMediaQuery({ minWidth: 1024 });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
    <>
      <h1>Driver's License Scanner 📸 🪪</h1>
      <div className="photo-buttons">
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          id="file-input"
        />
        {!webcam && (
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
            Upload photo
          </label>
        )}
        {isDesktop && !webcam && (
          <button onClick={() => setWebcam(true)}>
            Take photo with webcam
          </button>
        )}
        {file && <img src={file} alt="Uploaded image" />}
      </div>
      {webcam && <WebcamCapture></WebcamCapture>}
      {webcam && <button onClick={() => setWebcam(false)}>&#8592; Back</button>}
    </>
  );
}

export default App;
