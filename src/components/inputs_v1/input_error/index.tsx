import React from "react";
import { IError } from "../types";
import "./index.css";

const ErrorMessage: React.FC<IError> = ({ message = "" }) => {
  if (!message) {
    return <></>;
  }
  return <div className="error-message">{message}</div>;
};

export default ErrorMessage;
