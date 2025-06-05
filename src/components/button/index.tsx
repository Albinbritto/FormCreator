import { ReactNode } from "react";
import "./index.css";

interface IButton {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

const Button: React.FC<IButton> = (props) => {
  const { children, onClick, className = "" } = props;
  return (
    <button onClick={onClick} className={`button ${className}`}>
      {children}
    </button>
  );
};

export default Button;
