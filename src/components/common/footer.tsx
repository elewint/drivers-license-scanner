import "./footer.css";
import reactLogo from "/src/assets/react.svg";
import viteLogo from "/src/assets/vite.svg";

const Footer = () => {
  return (
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
  );
};

export default Footer;
