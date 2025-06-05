import { ReactNode } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./index.css";

interface IChip {
  children: ReactNode;
  closable?: boolean;
  onClose?: () => void;
}

const Chip: React.FC<IChip> = (props) => {
  const { children, closable, onClose } = props;
  return (
    <span className="chip">
      <span className="chip-label">{children}</span>
      {closable && (
        <span className="chip-close-icon" onClick={() => onClose?.()}>
          <AiOutlineClose />
        </span>
      )}
    </span>
  );
};

export default Chip;
