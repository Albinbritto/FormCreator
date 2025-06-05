import { IInputLabel } from "../types";
import "./index.css";

const InputLabel: React.FC<IInputLabel> = ({ id, children, style }) => {
  return (
    <div className="input-label">
      <label htmlFor={id} style={style}>
        {children}
      </label>
    </div>
  );
};

export default InputLabel;
