import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { AiFillCaretRight } from "react-icons/ai";

import "./index.css";

interface IAccordionPane {
  title: ReactNode;
  children: ReactNode;
  index?: number;
}

interface IAccordion {
  children: ReactNode;
}

interface IAccordionContext {
  activeIndex: number;
  onChange: (activeIdx: number) => void;
}

const AccordionContext = createContext<IAccordionContext | undefined>(
  undefined
);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionContext must be used within a ContextProvider");
  }
  return context;
};

const AccordionProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  function onChange(index: number) {
    setActiveIndex(index);
  }

  return (
    <AccordionContext.Provider value={{ activeIndex, onChange }}>
      {children}
    </AccordionContext.Provider>
  );
};

const Accordion: React.FC<IAccordion> & { Pane: React.FC<IAccordionPane> } = (
  props
) => {
  const { children } = props;
  const childrenArray = Children.toArray(children);
  return (
    <AccordionProvider>
      <div className="accordion">
        {Children.map(childrenArray, (child, index) => {
          if (isValidElement(child)) {
            return cloneElement(child as ReactElement<any>, { index });
          }
          return child;
        })}
      </div>
    </AccordionProvider>
  );
};

const Pane: React.FC<IAccordionPane> = (props) => {
  const { title, children, index = 0 } = props;
  const { activeIndex, onChange } = useAccordionContext();
  return (
    <div className="accordion-pane">
      <div className="accordion-title" onClick={() => onChange(index)}>
        <AiFillCaretRight
          style={{
            transform: `rotate(${activeIndex === index ? "90" : "0"}deg)`,
          }}
        />
        <span> {title}</span>
      </div>
      {activeIndex === index && (
        <div className="accordion-body">{children}</div>
      )}
    </div>
  );
};

Accordion.Pane = Pane;

export default Accordion;
