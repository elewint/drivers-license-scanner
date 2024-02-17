import { useState } from "react";
import "./app.css";
import { useMediaQuery } from "react-responsive";
import Webcam from "./components/features/webcam";

function App() {
  const [file, setFile] = useState<string | undefined>(undefined);
  const [webcam, setWebcam] = useState(false);

  const isDesktop = useMediaQuery({ minWidth: 1024 });

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
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
        {isDesktop && (
          <button onClick={() => setWebcam(true)}>
            Take photo with webcam
          </button>
        )}
        {file && <img src={file} alt="Uploaded image" />}
      </div>
      {webcam && <Webcam></Webcam>}
    </>
  );
}

export default App;
