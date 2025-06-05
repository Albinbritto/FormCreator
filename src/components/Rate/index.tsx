import React from "react";
import { Rate as AntRate, RateProps } from "antd";
import InputLabel from "../inputs_v1/input_label";

interface IRateProps extends RateProps {
  label?: string;
}

const Rate: React.FC<IRateProps> = ({ label, ...props }) => {
  return (
    <div>
      {label && <InputLabel id={props.id}>{label}</InputLabel>}
      <AntRate {...props} />
    </div>
  );
};

export default Rate;
