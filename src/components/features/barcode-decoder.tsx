import { useState } from "react";
import { BrowserPDF417Reader } from "@zxing/browser";

type BarcodeDecoderProps = { src: string | undefined };

export default function BarcodeDecoder({ src }: BarcodeDecoderProps) {
  const [success, setSuccess] = useState(false);
  const decodeBarcode = async () => {
    if (src) {
      try {
        const codeReader = new BrowserPDF417Reader();
        const resultImage = await codeReader.decodeFromImageUrl(src);
        console.log(resultImage);
        setSuccess(true);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <button onClick={decodeBarcode}>Decode Image</button>
      {success && <h1>Barcode decoded successfully!</h1>}
    </div>
  );
}
