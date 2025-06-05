import { RegisterOptions } from "react-hook-form";
import {
  FieldProperties,
  FieldType,
  SelectOption,
} from "../../components/Form/type";
import { IValidationRule } from "../../models/Element/ElementBase";

export interface IFormMetaData {
  formId: string;
  formName?: string;
  formDescription?: string;
  pages: IPageMetaData[];
}

export interface IPageNav {
  backgroundColor?: string;
  textColor?: string;
  text: string;
}

export interface IPageMetaData {
  pageId: string;
  pageName?: string;
  pageDescription?: string;
  fields: IFieldMetaData[];
  prevLabel?: string;
  nextLabel?: string;
  buttonPosition?: "left" | "right" | "center" | "space-between";
}

export interface IFieldMetaData {
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

type BaseElement = {
  id: string;
  label: string;
  Icon: string;
  type?: string;
  name?: string;
};

export type FormElement = BaseElement & Partial<{ options: SelectOption[] }>;

type FormCategory = {
  title: string;
  elements: FormElement[];
};

export type FormElements = {
  [category: string]: FormCategory;
};

export type PropertyPanelFieldType =
  | "singleline"
  | "select"
  | "choicesInput"
  | "validationInput"
  | "number";

export interface IPropertyMetaData {
  id: string;
  name: string;
  label: string;
  type: PropertyPanelFieldType;
  options?: SelectOption[];
  value?: string | SelectOption[] | IValidationRule[];
  disabled?: boolean;
  fieldId: string;
  pageId: string;
}
