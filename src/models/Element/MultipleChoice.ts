import { IPropertyMetaData } from "../../pages/FormBuilder/type";
import { ElementBase, IElementBase } from "./ElementBase";

interface MultipleChoiceOption {
  value: string;
  label: string;
}

interface IMultipleChoiceElement extends IElementBase {
  options?: MultipleChoiceOption[];
  value?: string | string[];
}

export class MultipleChoiceElement extends ElementBase {
  options: MultipleChoiceOption[];
  value?: string | string[];

  constructor(props: IMultipleChoiceElement) {
    super(props);
    this.options = props.options || [];
    this.value = props.value;
  }

  override updateProperties(newProps: Partial<IMultipleChoiceElement>): void {
    super.updateProperties(newProps);

    if (newProps.options !== undefined) this.options = newProps.options;
    if (newProps.value !== undefined) this.value = newProps.value;
  }

  addOption(option: MultipleChoiceOption): void {
    this.options.push(option);
  }

  removeOption(value: string): void {
    this.options = this.options.filter((option) => option.value !== value);
  }

  updateOption(value: string, updatedOption: MultipleChoiceOption): void {
    const index = this.options.findIndex((option) => option.value === value);
    if (index !== -1) {
      this.options[index] = updatedOption;
    }
  }

  override toJSON(): IMultipleChoiceElement {
    return {
      ...super.toJSON(),
      options: this.options,
      value: this.value,
    };
  }

  override clone(): MultipleChoiceElement {
    return new MultipleChoiceElement(this.toJSON());
  }

  override getProperties(): IPropertyMetaData[] {
    return [
      ...super.getProperties(),
      {
        label: "Add/Edit Choices",
        id: "options",
        name: "options",
        value: this.options,
        type: "choicesInput",
        disabled: true,
        fieldId: this.fieldId,
        pageId: this.pageId,
      },
    ];
  }
}
