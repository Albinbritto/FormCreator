import { SelectOption } from "../../../components/Form/type";
import Input from "../../../components/inputs_v1/input";
import Select from "../../../components/inputs_v1/select";
import { IValidationRule } from "../../../models/Element/ElementBase";
import { PROPERTY_FIELD_COMPONENT_MAP } from "./constant";
import { useFormBuilderStore } from "../../../store/FormBuilderStore";
import { Field } from "../../../models/Form";

interface ValidationInputProps {
  options: SelectOption[];
  value: IValidationRule[];
  label: string;
  id: string;
  name: string;
  field: Field;
}

export const ValidationInput: React.FC<ValidationInputProps> = (props) => {
  const { options, value: rules, label, id, name, field } = props;
  const { updateRules } = useFormBuilderStore();

  return (
    <>
      <Select options={options} label={label} id={id} name={name} />
      {rules.map(({ key, message, type, value }) => {
        const Component = PROPERTY_FIELD_COMPONENT_MAP[type];
        return (
          <>
            <Component
              key={key}
              id={key}
              name={key}
              value={value}
              label={`Enter ${key} value`}
              onChange={(e: any) => {
                updateRules(field, {
                  [key]: {
                    message,
                    value: e.target.value,
                  },
                });
              }}
            />
            <Input
              value={message}
              label="Validation Message"
              onChange={(e) => {
                updateRules(field, {
                  [key]: {
                    value,
                    message: e.target.value,
                  },
                });
              }}
            />
          </>
        );
      })}
    </>
  );
};
