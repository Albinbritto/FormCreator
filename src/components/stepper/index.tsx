import { AiOutlineCheck } from "react-icons/ai";
import "./index.css";

interface IStepper {
  steps?: string[];
  activeStep?: number;
  onChange?: (activeStep: number) => void;
  className?: string;
}

const Stepper: React.FC<IStepper> = (props) => {
  const { activeStep = 1, className = "", onChange, steps = [] } = props;
  return (
    <div className={`stepper ${className}`}>
      {steps.map((step, index) => {
        const currentStep = index + 1;
        const isCompleted = currentStep <= activeStep;
        return (
          <div
            className={`stepper-step ${isCompleted ? "completed" : ""}`}
            onClick={() => onChange?.(currentStep)}
          >
            <div className="stepper-step-index">
              <span>{isCompleted ? <AiOutlineCheck /> : currentStep}</span>
            </div>
            <div className="stepper-step-name">{step}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
