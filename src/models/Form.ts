import {
  IFieldMetaData,
  IFormMetaData,
  IPageMetaData,
  IPropertyMetaData,
} from "../pages/FormBuilder/type";
import { TextElement } from "./Element/TextElement";
import { NumberElement } from "./Element/NumberElement";
import { SelectElement } from "./Element/SelectElement";
import { ElementBase } from "./Element/ElementBase";
import { arrayMove } from "@dnd-kit/sortable";
import { MultipleChoiceElement } from "./Element/MultipleChoice";
import { SingleChoiceElement } from "./Element/SingleChoice";
import { DatePickerElement } from "./Element/DatePicker";
import { ButtonPositionType } from "../components/Form/type";
import { RegisterOptions } from "react-hook-form";
import { generateUniqueId } from "../utils/util";

export type Field = SelectElement | TextElement | NumberElement | ElementBase;

export class Form {
  formId: string;
  formName: string;
  formDescription: string;
  pages: Page[];

  constructor(props?: Partial<IFormMetaData>) {
    this.formId = props?.formId || generateUniqueId();
    this.formName = props?.formName || "untitled form";
    this.formDescription = props?.formDescription || "no description";
    this.pages = props?.pages
      ? props.pages.map((page) => new Page(page))
      : [new Page()];
  }

  updateProperties(newProps: Partial<IFormMetaData>): void {
    if (newProps.formName !== undefined) this.formName = newProps.formName;
    if (newProps.formDescription !== undefined)
      this.formDescription = newProps.formDescription;
  }

  addPage(page: Page, index?: number) {
    if (index !== undefined) {
      this.pages.splice(index, 0, page);
      return;
    }
    this.pages.push(page);
  }

  isPage(id: string) {
    return this.pages.findIndex(({ pageId }) => pageId === id) >= 0;
  }

  findPage(id: string) {
    return this.pages.find(
      ({ pageId, fields }) =>
        pageId === id || fields.some(({ fieldId }) => fieldId === id)
    );
  }

  removePage(pageId: string) {
    this.pages = this.pages.filter((page) => page.pageId !== pageId);
  }

  toJSON(): IFormMetaData {
    return {
      formId: this.formId,
      formName: this.formName,
      formDescription: this.formDescription,
      pages: this.pages.map((page) => page.toJSON()),
    };
  }

  clone() {
    return new Form(this.toJSON());
  }
}

export class Page {
  pageId: string;
  pageName: string;
  pageDescription: string;
  fields: Field[];
  prevLabel?: string;
  nextLabel?: string;
  buttonPosition: ButtonPositionType;

  constructor(props?: Partial<IPageMetaData>) {
    this.pageId = props?.pageId || generateUniqueId();
    this.pageName = props?.pageName || "";
    this.pageDescription = props?.pageDescription || "";
    this.fields = props?.fields
      ? props.fields.map((field) => this.createField(field))
      : [];
    this.nextLabel = props?.nextLabel;
    this.prevLabel = props?.prevLabel;
    this.buttonPosition = props?.buttonPosition || "space-between";
  }

  updateProperties(newProps: Partial<IPageMetaData>): void {
    if (newProps.pageName !== undefined) this.pageName = newProps.pageName;
    if (newProps.pageDescription !== undefined)
      this.pageDescription = newProps.pageDescription;
    if (newProps.prevLabel !== undefined) this.prevLabel = newProps.prevLabel;
    if (newProps.nextLabel !== undefined) this.nextLabel = newProps.nextLabel;
    if (newProps.buttonPosition !== undefined)
      this.buttonPosition = newProps.buttonPosition;
  }

  updateFieldProperties(fieldId: string, newProps: Partial<IFieldMetaData>) {
    const field = this.fields.find((field) => field.fieldId === fieldId);
    field?.updateProperties(newProps);
  }

  addField(field: IFieldMetaData) {
    this.fields.push(this.createField(field));
  }

  insertField(Field: IFieldMetaData, index: number) {
    const newField = this.createField(Field);
    this.fields.splice(index, 0, newField);
    return newField;
  }

  removeField(fieldId: string) {
    this.fields = this.fields.filter((field) => field.fieldId !== fieldId);
  }

  moveField(activeIndex: number, overIndex: number) {
    this.fields = arrayMove(this.fields, activeIndex, overIndex);
  }

  updateFieldRules(fieldId: string, newRules: Partial<RegisterOptions>) {
    const field = this.fields.find((field) => field.fieldId === fieldId);
    field?.updateRules(newRules);
  }

  removeFieldRule(fieldId: string, ruleName: keyof RegisterOptions) {
    const field = this.fields.find((field) => field.fieldId === fieldId);
    field?.removeRule(ruleName);
  }

  createField(field: IFieldMetaData): Field {
    switch (field.type) {
      case "singleline":
      case "email":
        return new TextElement(field);
      case "number":
        return new NumberElement(field);
      case "select":
        return new SelectElement(field);
      case "multichoice":
        return new MultipleChoiceElement(field);
      case "singlechoice":
        return new SingleChoiceElement(field);
      case "datepicker":
        return new DatePickerElement(field);
      default:
        return new ElementBase(field);
    }
  }

  toJSON(): IPageMetaData {
    return {
      pageId: this.pageId,
      pageName: this.pageName,
      pageDescription: this.pageDescription,
      fields: this.fields.map((field) => field.toJSON() as IFieldMetaData),
      nextLabel: this.nextLabel,
      prevLabel: this.prevLabel,
      buttonPosition: this.buttonPosition,
    };
  }

  getProperties(): IPropertyMetaData[] {
    return [
      {
        label: "Edit Page Title",
        id: "pageName",
        name: "pageName",
        value: this.pageName,
        type: "singleline",
      },

      {
        label: "Edit Next Button Label",
        id: "nextLabel",
        name: "nextLabel",
        value: this.nextLabel,
        type: "singleline",
      },
      {
        label: "Edit Previous Button Label",
        id: "prevLabel",
        name: "prevLabel",
        value: this.prevLabel,
        type: "singleline",
      },
      {
        label: "Edit Button Position",
        id: "buttonPosition",
        name: "buttonPosition",
        value: this.buttonPosition,
        hide: true,
        type: "singlechoice",
        options: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
          { label: "Center", value: "center" },
          { label: "default", value: "space-between" },
        ],
      },
    ];
  }
}
