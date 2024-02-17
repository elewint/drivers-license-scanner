import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [file, setFile] = useState<string | undefined>(undefined);

  function handleChange(e) {
    console.log(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <>
      <h1>Driver's License Scanner</h1>
      <div className="photo-buttons">
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          id="file-input"
        />
        <label htmlFor="file-input" tabIndex={0}>
          Upload photo
        </label>
        <button>Take photo</button>
        {file && <img src={file} alt="Uploaded image" />}
      </div>
      <div className="footer-parent">
        <div className="footer">
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <p>Made with Vite and React.</p>
        </div>
      </div>
    </>
  );
}

export default App;
