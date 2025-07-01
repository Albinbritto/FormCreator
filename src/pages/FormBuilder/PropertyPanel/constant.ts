import CheckBox from "../../../components/inputs_v1/checkbox";
import Input from "../../../components/inputs_v1/input";
import Radio from "../../../components/inputs_v1/radio";
import Select from "../../../components/inputs_v1/select";
import { PropertyPanelFieldType } from "../type";
import { ChoicesInput } from "./ChoicesInput";
import { ValidationInput } from "./ValidationInput";

export const PROPERTY_FIELD_COMPONENT_MAP: Record<
  PropertyPanelFieldType,
  React.FC<any>
> = {
  singleline: Input,
  select: Select,
  choicesInput: ChoicesInput,
  validationInput: ValidationInput,
  number: Input,
  singlechoice: Radio,
  checkbox: CheckBox,
};
