import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Driver's License Scanner</h1>
      <div className="photo-buttons">
        <button>Upload photo</button>
        <button onClick={() => setCount((count) => count + 1)}>
          Take photo {count}
        </button>
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
