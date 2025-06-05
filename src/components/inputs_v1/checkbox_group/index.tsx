import { Checkbox } from "antd";
import React from "react";
import { ICheckBoxGroup } from "../types";
import InputLabel from "../input_label";
import "./index.css";

const CheckBoxGroup: React.FC<ICheckBoxGroup> = ({
  label,
  direction = "vertical",
  ...props
}) => {
  const isVertical = direction === "vertical";
  return (
    <div className="checkbox-group-wrapper">
      {label && <InputLabel>{label}</InputLabel>}
      <Checkbox.Group
        style={{
          display: "inline-flex",
          flexDirection: isVertical ? "column" : "row",
        }}
        {...props}
      />
    </div>
  );
};

export default CheckBoxGroup;
