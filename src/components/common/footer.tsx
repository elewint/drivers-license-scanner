import "./footer.css";
import reactLogo from "/src/assets/react.svg";
import typeScriptLogo from "/src/assets/typescript.svg";
import viteLogo from "/src/assets/vite.svg";

const Footer = () => {
  return (
    <div className="footer-parent">
      <div className="footer">
        <p>Made by Eli Intriligator with React, TypeScript, and Vite.</p>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img src={typeScriptLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
