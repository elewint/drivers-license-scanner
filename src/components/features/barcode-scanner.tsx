import {
  Html5Qrcode,
  Html5QrcodeSupportedFormats,
  Html5QrcodeScannerState,
} from "html5-qrcode";
import { useCallback } from "react";
import { toast } from "react-hot-toast";

type QRDecoderProps = {
  imgSrc: string | undefined;
  onBarcodeFound: (decodedText: string) => void;
};

export default function BarcodeScanner({
  imgSrc,
  onBarcodeFound,
}: QRDecoderProps) {
  let html5QrCode: Html5Qrcode;

  const barcodeFound = useCallback(
    (decodedText: string) => {
      if (decodedText) {
        onBarcodeFound(decodedText);
      }
    },
    [onBarcodeFound]
  );

  const onScanSuccess = (decodedText: string) => {
    barcodeFound(decodedText);
    toast.success("Barcode detected! 🎉", {
      duration: 3000,
    });
  };

  const onScanError = (error: any) => {
    console.error(`Scan error = ${error}`);
    toast.error("Barcode not detected 😢 Please try uploading another photo", {
      duration: 7000,
      id: "scan-error",
    });
  };

  const stopScanner = () => {
    if (
      html5QrCode.getState() === Html5QrcodeScannerState.SCANNING ||
      html5QrCode.getState() === Html5QrcodeScannerState.PAUSED
    ) {
      html5QrCode.stop().catch((err) => {
        console.error("Failed to stop the scanner", err);
      });
    }
  };

  const scanQRCode = () => {
    // Convert base64 to blob, then convert blob to File
    const blob = imgSrc ? base64ToBlob(imgSrc, "image/jpeg") : null;
    const file = blob
      ? new File([blob], "qr-image.jpeg", { type: blob.type })
      : null;

    // Initialize Html5Qrcode instance that only scans PDF_417 barcodes
    html5QrCode = new Html5Qrcode("reader", {
      formatsToSupport: [Html5QrcodeSupportedFormats.PDF_417],
      verbose: false,
    });

    if (file) {
      html5QrCode
        .scanFile(file, false)
        .then(onScanSuccess)
        .catch(onScanError)
        .finally(() => {
          stopScanner();
        });
    }
  };

  function base64ToBlob(base64Data: string, contentType: string) {
    // Remove prefix from data URL if it exists
    const base64Content = base64Data.split(";base64,").pop();

    try {
      const byteCharacters = atob(base64Content ?? "");
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);

        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    } catch (e) {
      console.error("Failed to convert base64 to blob:", e);
      return null;
    }
  }

  return (
    <div>
      <button onClick={scanQRCode}>Scan Barcode</button>
      <div id="reader" style={{ display: "none" }}></div>
    </div>
  );
}
