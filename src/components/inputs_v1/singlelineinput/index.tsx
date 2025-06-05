import React from "react";
import Input from "../input";
import "./index.css";
import { IInput } from "../types";

const SingleLineInput: React.FC<IInput> = (props) => {
  return (
    <div className="single-line-input-wrapper">
      <Input className="single-line-input" {...props} />
    </div>
  );
};

export default SingleLineInput;
