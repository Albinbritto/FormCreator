import React from "react";
import { Input as AntInput } from "antd";
import InputLabel from "../input_label";
import { ITextArea } from "../types";
import "./index.css";
import ErrorMessage from "../input_error";

const TextArea: React.FC<ITextArea> = ({
  label,
  rows = 5,
  cols = 5,
  resize = false,
  error,
  ...props
}) => {
  return (
    <div className="textarea-wrapper">
      {label && <InputLabel id={props.id}>{label}</InputLabel>}
      <AntInput.TextArea
        {...props}
        rows={rows}
        cols={cols}
        className={`${!resize ? "no-resize" : ""}`}
      />
      <ErrorMessage message={error?.message} />
    </div>
  );
};

export default TextArea;
