import { DatePicker as AntDatePicker } from "antd";
import React from "react";
import InputLabel from "../input_label";

type DatePickerProps = React.ComponentProps<typeof AntDatePicker>;

interface IDatePickerProps extends DatePickerProps {
  label?: string;
}

const DatePicker: React.FC<IDatePickerProps> = ({ label, ...props }) => {
  return (
    <div className="date-picker">
      {label && <InputLabel id={props.id}>{label}</InputLabel>}
      <AntDatePicker {...props} />
    </div>
  );
};

export default DatePicker;
