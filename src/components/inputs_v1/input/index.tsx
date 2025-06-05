import React from "react";
import { Input as AntInput } from "antd";
import { IInput } from "../types";
import InputLabel from "../input_label";
import ErrorMessage from "../input_error";

const Input: React.FC<IInput> = ({ label, error, ...props }) => {
  return (
    <div className="input-wrapper">
      {label && <InputLabel id={props.id}>{label}</InputLabel>}
      <AntInput {...props} value={props.value} />
      <ErrorMessage message={error?.message} />
    </div>
  );
};

export default Input;
