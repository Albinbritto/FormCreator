import { ElementBase, IElementBase } from "./ElementBase";

interface ITextElement extends IElementBase {
  placeholder?: string;
  value?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

export class TextElement extends ElementBase {
  placeholder: string;
  value: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;

  constructor(props: ITextElement) {
    super(props);
    this.placeholder = props.placeholder || "";
    this.value = props.value || "";
    this.maxLength = props.maxLength;
    this.minLength = props.minLength;
    this.pattern = props.pattern;
  }

  override updateProperties(newProps: Partial<ITextElement>): void {
    super.updateProperties(newProps);
    if (newProps.placeholder !== undefined)
      this.placeholder = newProps.placeholder;
    if (newProps.value !== undefined) this.value = newProps.value;
    if (newProps.maxLength !== undefined) this.maxLength = newProps.maxLength;
    if (newProps.minLength !== undefined) this.minLength = newProps.minLength;
    if (newProps.pattern !== undefined) this.pattern = newProps.pattern;
  }

  override toJSON(): ITextElement {
    return {
      ...super.toJSON(),
      placeholder: this.placeholder,
      value: this.value,
      maxLength: this.maxLength,
      minLength: this.minLength,
      pattern: this.pattern,
    };
  }

  override clone(): TextElement {
    return new TextElement(this.toJSON());
  }

  override getProperties() {
    return super.getProperties();
  }
}
