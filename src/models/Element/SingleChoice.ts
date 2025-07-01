import { IPropertyMetaData } from "../../pages/FormBuilder/type";
import { ElementBase, IElementBase } from "./ElementBase";

interface SingleChoiceOption {
  value: string;
  label: string;
}

interface ISingleChoiceElement extends IElementBase {
  options?: SingleChoiceOption[];
  value?: string;
  isDropdown?: boolean;
}

export class SingleChoiceElement extends ElementBase {
  options: SingleChoiceOption[];
  value?: string;
  isDropdown: boolean;

  constructor(props: ISingleChoiceElement) {
    super(props);
    this.options = props.options || [];
    this.value = props.value;
    this.isDropdown = props.isDropdown || false;
  }

  override updateProperties(newProps: Partial<ISingleChoiceElement>): void {
    super.updateProperties(newProps);

    if (newProps.options !== undefined) this.options = newProps.options;
    if (newProps.value !== undefined) this.value = newProps.value;
    if (newProps.isDropdown !== undefined)
      this.isDropdown = newProps.isDropdown;
  }

  addOption(option: SingleChoiceOption): void {
    this.options.push(option);
  }

  removeOption(value: string): void {
    this.options = this.options.filter((option) => option.value !== value);
  }

  updateOption(value: string, updatedOption: SingleChoiceOption): void {
    const index = this.options.findIndex((option) => option.value === value);
    if (index !== -1) {
      this.options[index] = updatedOption;
    }
  }

  override toJSON(): ISingleChoiceElement {
    return {
      ...super.toJSON(),
      options: this.options,
      value: this.value,
      isDropdown: this.isDropdown,
    };
  }

  override clone(): SingleChoiceElement {
    return new SingleChoiceElement(this.toJSON());
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
      },
      {
        label: "Is Dropdown",
        id: "isDropdown",
        name: "isDropdown",
        value: this.isDropdown,
        type: "checkbox",
      },
    ];
  }
}
