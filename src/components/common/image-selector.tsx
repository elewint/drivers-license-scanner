import React from "react";

type ImageSelectorProps = {
  onImageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function ImageSelector({ onImageChange }: ImageSelectorProps) {
  return (
    <select
      onChange={onImageChange}
      style={{ width: "auto", fontSize: "1em", margin: "2em" }}
    >
      <option value="">Select an example license</option>
      <option value="/1_CA.jpeg">California license</option>
      <option value="/2_OH.jpeg">Ohio license</option>
      <option value="/3_NY.jpeg">New York license</option>
    </select>
  );
}
