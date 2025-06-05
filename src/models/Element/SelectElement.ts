import { IPropertyMetaData } from "../../pages/FormBuilder/type";
import { ElementBase, IElementBase } from "./ElementBase";

interface SelectOption {
  value: string;
  label: string;
}

interface ISelectElement extends IElementBase {
  options?: SelectOption[];
  value?: string | string[];
  multiple?: boolean;
  search?: boolean;
}

export class SelectElement extends ElementBase {
  options: SelectOption[];
  value?: string | string[];
  multiple: boolean;
  search: boolean;

  constructor(props: ISelectElement) {
    super(props);
    this.options = props.options || [];
    this.value = props.value;
    this.multiple = props.multiple || false;
    this.search = props.search || false;
  }

  override updateProperties(newProps: Partial<ISelectElement>): void {
    super.updateProperties(newProps);

    if (newProps.options !== undefined) this.options = newProps.options;
    if (newProps.value !== undefined) this.value = newProps.value;
    if (newProps.multiple !== undefined) this.multiple = newProps.multiple;
    if (newProps.search !== undefined) this.search = newProps.search;
  }

  addOption(option: SelectOption): void {
    this.options.push(option);
  }

  removeOption(value: string): void {
    this.options = this.options.filter((option) => option.value !== value);
  }

  updateOption(value: string, updatedOption: SelectOption): void {
    const index = this.options.findIndex((option) => option.value === value);
    if (index !== -1) {
      this.options[index] = updatedOption;
    }
  }

  override toJSON(): ISelectElement {
    return {
      ...super.toJSON(),
      options: this.options,
      value: this.value,
      multiple: this.multiple,
    };
  }

  override clone(): SelectElement {
    return new SelectElement(this.toJSON());
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
