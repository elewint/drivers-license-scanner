import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "./index.css";
import Footer from "./components/common/footer.tsx";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Footer />
    <Toaster
      position="bottom-center"
      toastOptions={{ style: { fontSize: "1.2rem" } }}
    />
  </React.StrictMode>
);
