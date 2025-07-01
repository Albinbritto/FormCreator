import React from "react";
import { Select as AntSelect } from "antd";
import { ISelect } from "../types";
import "./index.css";
import InputLabel from "../input_label";
import { AiFillCaretDown } from "react-icons/ai";
import ErrorMessage from "../input_error";

const MultiSelect: React.FC<ISelect> = ({ label = "", error, ...props }) => {
  return (
    <div className="select-wrapper">
      {label && <InputLabel id={props.id}>{label}</InputLabel>}
      <AntSelect {...props} suffixIcon={<AiFillCaretDown />} mode="multiple" />
      <ErrorMessage message={error?.message} />
    </div>
  );
};

export default MultiSelect;
