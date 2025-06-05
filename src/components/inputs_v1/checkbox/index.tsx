import React from "react";
import { Checkbox as AntCheckBox } from "antd";
import { ICheckBox } from "../types";
import "./index.css";

const CheckBox: React.FC<ICheckBox> = ({ label, ...props }) => {
  return (
    <div className="checkbox-wrapper">
      <AntCheckBox {...props}>{label}</AntCheckBox>
    </div>
  );
};

export default CheckBox;
