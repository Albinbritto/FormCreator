import { RegisterOptions } from "react-hook-form";
import { FieldProperties, FieldType } from "../../components/Form/type";
import {
  IPropertyMetaData,
  PropertyPanelFieldType,
} from "../../pages/FormBuilder/type";
import { generateUniqueId } from "../../utils/util";

export interface IElementBase {
  fieldId: string;
  fieldName: string;
  label?: string;
  type: FieldType;
  required?: boolean;
  properties?: FieldProperties;
  [key: string]: any;
  pageId: string;
  rules?: RegisterOptions;
}

export interface IValidationRule {
  message: string;
  value: any;
  type: PropertyPanelFieldType;
  key: keyof RegisterOptions;
}

const ValidationInputMapping: Record<string, PropertyPanelFieldType> = {
  min: "number",
  max: "number",
  minLength: "number",
  maxLength: "number",
};

export class ElementBase {
  fieldId: string;
  fieldName: string;
  label: string;
  type: FieldType;
  required: boolean;
  properties: FieldProperties;
  pageId: string;
  rules: RegisterOptions;

  constructor(props: IElementBase) {
    this.fieldId = props.fieldId;
    this.pageId = props.pageId;
    this.label = props.label || "";
    this.fieldName = props.fieldName;
    this.type = props.type || "singleline";
    this.required = props.required || false;
    this.properties = props.properties || {};
    this.rules = props.rules || {};
  }

  updateProperties(newProps: Partial<IElementBase>): void {
    if (newProps.label !== undefined) {
      this.label = newProps.label;
      this.fieldName = `${this.label}_${this.fieldId}`;
    }
    if (newProps.required !== undefined) {
      this.required = newProps.required;
      if (this.required) {
        this.rules.required = {
          message: `${this.label} is required`,
          value: true,
        };
      } else {
        this.removeRule("required");
      }
    }
    if (newProps.type !== undefined) this.type = newProps.type;
    if (newProps.properties) {
      this.properties = { ...this.properties, ...newProps.properties };
    }
  }

  updateRules(newRules: Partial<RegisterOptions>): void {
    this.rules = {
      ...this.rules,
      ...newRules,
    } as RegisterOptions;
  }

  removeRule(ruleName: keyof RegisterOptions): void {
    if (this.rules && ruleName in this.rules) {
      const { [ruleName]: _, ...rest } = this.rules;
      this.rules = rest as RegisterOptions;
    }
  }

  toJSON(): IElementBase {
    return {
      fieldId: this.fieldId,
      fieldName: this.fieldName,
      pageId: this.pageId,
      type: this.type,
      label: this.label,
      required: this.required,
      properties: this.properties,
      rules: this.rules,
    };
  }

  clone() {
    return new ElementBase(this.toJSON());
  }

  getProperties(): IPropertyMetaData[] {
    return [
      {
        label: "Change Field Type",
        id: "type",
        name: "type",
        value: this.type,
        type: "select",
        options: [
          {
            label: "Single Line",
            value: "singleline",
          },
          {
            label: "Multi Line",
            value: "multiline",
          },
          {
            label: "Number",
            value: "number",
          },
          {
            label: "Date",
            value: "datepicker",
          },
          {
            label: "Select",
            value: "select",
          },
          {
            label: "Single Choice",
            value: "singlechoice",
          },
          {
            label: "Multi Choice",
            value: "multichoice",
          },
        ],
      },
      {
        label: "Edit Field Label",
        id: "label",
        name: "label",
        value: this.label,
        type: "singleline",
      },
      {
        label: "Placeholder",
        id: "placeholder",
        name: "placeholder",
        value: this.properties?.placeholder,
        type: "singleline",
      },
      {
        label: "Required",
        id: "required",
        name: "required",
        value: this.required,
        type: "checkbox",
      },
      {
        label: "Field ID",
        id: "fieldId",
        name: "fieldId",
        value: this.fieldId,
        type: "singleline",
      },
      {
        label: "Field Name",
        id: "fieldName",
        name: "fieldName",
        value: this.fieldName,
        type: "singleline",
      },
      {
        label: "Select Validation Type",
        id: "validationType",
        name: "rules",
        type: "validationInput",
        options: [
          { label: "Min Length", value: "minLength" },
          { label: "Max Length", value: "maxLength" },
          { label: "Min Value", value: "min" },
          { label: "Max Value", value: "max" },
        ],
        value: this.getValidationRules() as IValidationRule[],
      },
    ];
  }

  getValidationRules() {
    return Object.entries(this.rules).map(([key, rule]) => {
      if (
        typeof rule === "object" &&
        rule !== null &&
        "value" in rule &&
        "message" in rule
      ) {
        return {
          message: rule.message,
          value: rule.value,
          type: ValidationInputMapping[key],
          key,
        };
      } else {
        return {
          message: "",
          value: rule,
          type: ValidationInputMapping[key],
          key,
        };
      }
    });
  }
}
