import { ElementBase, IElementBase } from "./ElementBase";

interface IDatePickerElement extends IElementBase {
  format?: string;
  value?: string;
  minDate?: string;
  maxDate?: string;
}

export class DatePickerElement extends ElementBase {
  format: string;
  value?: string;
  minDate?: string;
  maxDate?: string;

  constructor(props: IDatePickerElement) {
    super(props);
    this.format = props.format || "DD-MM-YYYY";
    this.value = props.value;
    this.minDate = props.minDate;
    this.maxDate = props.maxDate;
  }

  override updateProperties(newProps: Partial<IDatePickerElement>): void {
    super.updateProperties(newProps);

    if (newProps.format !== undefined) this.format = newProps.format;
    if (newProps.value !== undefined) this.value = newProps.value;
    if (newProps.minDate !== undefined) this.minDate = newProps.minDate;
    if (newProps.maxDate !== undefined) this.maxDate = newProps.maxDate;
  }

  override toJSON(): IDatePickerElement {
    return {
      ...super.toJSON(),
      format: this.format,
      value: this.value,
      minDate: this.minDate,
      maxDate: this.maxDate,
    };
  }

  override clone(): DatePickerElement {
    return new DatePickerElement(this.toJSON());
  }
}
