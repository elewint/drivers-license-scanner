import { Html5QrcodeScanner, Html5QrcodeFullConfig } from "html5-qrcode";
import React, { Component } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

interface Html5QrcodePluginProps {
  fps?: number;
  qrbox?: number;
  aspectRatio?: number;
  disableFlip?: boolean;
  verbose?: boolean;
  qrCodeSuccessCallback: (qrCode: string) => void;
  qrCodeErrorCallback?: (error: Error) => void;
}

class Html5QrcodePlugin extends Component<Html5QrcodePluginProps> {
  private html5QrcodeScanner: Html5QrcodeScanner;

  componentWillUnmount() {
    this.html5QrcodeScanner.clear().catch((error: Error) => {
      console.error("Failed to clear html5QrcodeScanner. ", error);
    });
  }

  componentDidMount() {
    const createConfig = (
      props: Html5QrcodePluginProps
    ): Html5QrcodeFullConfig => {
      const config: Html5QrcodeFullConfig = {};
      if (props.fps) {
        config.fps = props.fps;
      }
      if (props.qrbox) {
        config.qrbox = props.qrbox;
      }
      if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
      }
      if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
      }
      return config;
    };

    const config = createConfig(this.props);
    const verbose = this.props.verbose === true;

    if (!this.props.qrCodeSuccessCallback) {
      throw new Error("qrCodeSuccessCallback is a required callback.");
    }

    this.html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );
    this.html5QrcodeScanner.render(
      this.props.qrCodeSuccessCallback,
      this.props.qrCodeErrorCallback
    );
  }

  render() {
    return <div id={qrcodeRegionId} />;
  }
}

export default Html5QrcodePlugin;
