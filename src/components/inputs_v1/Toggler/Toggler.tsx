import { Switch } from "antd";
import React from "react";
import InputLabel from "../input_label";

type SwitchProps = React.ComponentProps<typeof Switch>;

interface ITogglerProps extends SwitchProps {
  label?: string;
}

const Toggler: React.FC<ITogglerProps> = ({ label, ...props }) => {
  return (
    <div className="toggler">
      {label && <InputLabel id={props.id}>{label}</InputLabel>}
      <Switch {...props} />
    </div>
  );
};

export default Toggler;
