import React from "react";
import { Radio as AntRadio } from "antd";
import "./index.css";
import InputLabel from "../input_label";
import { IRadio } from "../types";
import ErrorMessage from "../input_error";

const Radio: React.FC<IRadio> = ({ label, error, ...props }) => {
  return (
    <div className="radio-wrapper">
      {label && <InputLabel>{label}</InputLabel>}
      <AntRadio.Group {...props}>{label}</AntRadio.Group>
      <ErrorMessage message={error?.message} />
    </div>
  );
};

export default Radio;
