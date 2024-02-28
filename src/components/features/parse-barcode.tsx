import aamva from "aamva";

type ParseBarcodeProps = {
  barcodeData: string | undefined;
};

export default function ParseBarcode({ barcodeData }: ParseBarcodeProps) {
  const license_data = aamva.pdf417(barcodeData);

  const titleCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());
  };

  const date = (date: string) => {
    return `${date.slice(4, 6)}/${date.slice(6, 8)}/${date.slice(0, 4)}`;
  };

  const getFullName = () => {
    return `${titleCase(license_data.name.first)} ${titleCase(
      license_data.name.middle
    )} ${titleCase(license_data.name.last)}`;
  };

  const getAddress = () => {
    return titleCase(license_data.address);
  };

  const getExpirationDate = () => {
    return `${date(license_data.expiration_date)}`;
  };

  const getIDNumber = () => {
    return `${license_data.id}`;
  };

  return (
    <div>
      <h3>Full name: {getFullName()}</h3>
      <h3>Address: {getAddress()}</h3>
      <h3>Expiration date: {getExpirationDate()}</h3>
      <h3>ID Number: {getIDNumber()}</h3>
    </div>
  );
}
