import { ReactNode } from "react";
import {
  ICheckBox,
  ICheckBoxGroup,
  IInput,
  IRadio,
  ISelect,
} from "../../inputs_v1";
import { RegisterOptions } from "react-hook-form";

export interface IFormEngine {
  dataSource: IDataSource;
  values?: Record<string, any>;
  onSubmit?: (data: any) => void;
  header?: ReactNode;
  footer?: ReactNode;
}

export interface IMultiStepForm extends IFormEngine {
  activeIndex?: number;
}

export interface IDataSource {
  formId: string;
  formName?: string;
  formDescription?: string;
  pages: IPage[];
}

export interface IPage {
  pageId: string;
  pageName?: string;
  pageDescription?: string;
  fields: IField[];
  nextLabel?: string;
  prevLabel?: string;
  buttonPosition?: ButtonPositionType;
}

export interface IField {
  fieldId: string;
  fieldName: string;
  label?: string;
  type: FieldType;
  required?: boolean;
  rules?: RegisterOptions;
  options?: SelectOption[];
  properties?: FieldProperties;
  pageId: string;
}

export type FieldType =
  | "singleline"
  | "multiline"
  | "email"
  | "number"
  | "multichoice"
  | "singlechoice"
  | "select"
  | "password"
  | "color"
  | "section"
  | "datepicker"
  | "heading"
  | "rate"
  | "fallback";

export interface FieldValidations {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export interface GridPosition {
  row: number;
  col: number;
  rowSpan?: number;
  colSpan?: number;
}

export interface FieldProperties {
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  search?: boolean;
  mode?: "single" | "multiple";
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface IForm {
  children: ReactNode;
  onSubmit?: (data: any) => void;
  defaultValues?: any;
  style?: React.CSSProperties;
  className?: string;
}

export interface IFormControl {
  children: React.ReactElement<
    IInput | ISelect | IRadio | ICheckBox | ICheckBoxGroup
  >;
  rules?: RegisterOptions;
  name: string;
  label?: string;
}

export type ButtonPositionType = "space-between" | "left" | "right" | "center";
