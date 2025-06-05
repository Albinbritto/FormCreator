import { FieldType } from "./type";
import Input from "../inputs_v1/input";
import TextArea from "../inputs_v1/textarea";
import Select from "../inputs_v1/select";
import CheckBoxGroup from "../inputs_v1/checkbox_group";
import Radio from "../inputs_v1/radio";
import Section from "../inputs_v1/section";
import Rate from "../Rate";
import DatePicker from "../inputs_v1/DatePicker";
import Heading from "../inputs_v1/Heading";
import { FallBack } from "../inputs_v1/Fallback";

export const FIELD_COMPONENT_MAP: Record<FieldType, React.FC<any>> = {
  singleline: Input,
  number: Input,
  email: Input,
  singlechoice: Radio,
  select: Select,
  password: Input,
  multiline: TextArea,
  color: Input,
  multichoice: CheckBoxGroup,
  section: Section,
  rate: Rate,
  datepicker: DatePicker,
  heading: Heading,
  fallback: FallBack,
};
