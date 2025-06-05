import { CheckboxProps, InputProps, Radio, SelectProps } from "antd";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { TextAreaProps } from "antd/es/input";
import { ReactNode } from "react";

export interface IInput extends InputProps {
  label?: ReactNode;
  error?: IError;
}

export interface IError {
  type?: string;
  message?: string;
}

export interface IInputLabel {
  children: ReactNode;
  id?: string;
  style?: React.CSSProperties;
}

export interface ITextArea extends TextAreaProps {
  label?: ReactNode;
  resize?: boolean;
  error?: IError;
}

export interface ISelect extends SelectProps {
  label?: ReactNode;
  name?: string;
  error?: IError;
}

export interface ICheckBox extends CheckboxProps {
  label?: ReactNode;
  name?: string;
}

export interface ICheckBoxGroup extends CheckboxGroupProps {
  label?: ReactNode;
  name?: string;
  direction?: "vertical" | "horizontal";
}

export interface IRadio extends React.ComponentProps<typeof Radio.Group> {
  label?: ReactNode;
  name?: string;
  error?: IError;
}
