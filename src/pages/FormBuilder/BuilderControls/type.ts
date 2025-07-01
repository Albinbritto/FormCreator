import { Field, Page } from "../../../models/Form";

export type ControlAction = "setting" | "copy" | "delete";

export type ControlType = "field" | "page" | "form";

export interface ControlConfig {
  action: ControlAction;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  controlsFor: ControlType[];
}

export interface ControlsProps {
  type?: ControlType;
  onClick?: (action: ControlAction) => void;
  className?: string;
}

export interface IFieldControlsProps {
  field: Field;
  page: Page;
  label?: string;
  activeIndex: number;
}
