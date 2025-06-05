import { ElementBase, IElementBase } from "./ElementBase";

export interface INumberElement extends IElementBase {
  placeholder?: string;
  value?: number;
  min?: number;
  max?: number;
}

export class NumberElement extends ElementBase {
  placeholder: string;
  value?: number;
  min?: number;
  max?: number;

  constructor(props: INumberElement) {
    super(props);
    this.placeholder = props.placeholder || "";
    this.value = props.value;
    this.min = props.min;
    this.max = props.max;
  }

  override updateProperties(newProps: Partial<INumberElement>): void {
    super.updateProperties(newProps);

    if (newProps.placeholder !== undefined)
      this.placeholder = newProps.placeholder;
    if (newProps.value !== undefined) this.value = newProps.value;
    if (newProps.min !== undefined) this.min = newProps.min;
    if (newProps.max !== undefined) this.max = newProps.max;
  }

  override toJSON(): INumberElement {
    return {
      ...super.toJSON(),
      placeholder: this.placeholder,
      value: this.value,
      min: this.min,
      max: this.max,
    };
  }

  override clone(): NumberElement {
    return new NumberElement(this.toJSON());
  }
}
