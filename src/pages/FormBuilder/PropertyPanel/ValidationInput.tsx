import { SelectOption } from "../../../components/Form/type";
import Input from "../../../components/inputs_v1/input";
import { IValidationRule } from "../../../models/Element/ElementBase";
import { PROPERTY_FIELD_COMPONENT_MAP } from "./constant";
import { useFormBuilderStore } from "../../../store/FormBuilderStore";
import { Field } from "../../../models/Form";
import { List } from "antd";
import { useMemo } from "react";
import { StyledValidationInput } from "./index.style";
import MultiSelect from "../../../components/inputs_v1/multi_select";

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
  const { updateRules, formMetaData, removeRule } = useFormBuilderStore();

  const currentPage = useMemo(() => {
    return formMetaData.findPage(field.pageId);
  }, [formMetaData, field.pageId]);

  const fieldRules = useMemo(() => {
    return rules.filter((rule) => rule.key !== "required");
  }, [rules]);

  const ruleNames = useMemo(() => {
    return rules.map((rule) => rule.key);
  }, [rules]);

  return (
    <StyledValidationInput>
      <MultiSelect
        options={options}
        label={label}
        id={id}
        name={name}
        value={ruleNames}
        onChange={(rules: IValidationRule["key"][]) => {
          if (currentPage) {
            if (ruleNames.length > rules.length) {
              const removedRule =
                ruleNames.find((name) => !rules.includes(name)) || "";
              removedRule &&
                removeRule(currentPage, field.fieldId, removedRule);
            } else {
              const addedRule = rules.find((name) => !ruleNames.includes(name));
              addedRule &&
                updateRules(currentPage, field.fieldId, {
                  [addedRule]: {
                    value: "",
                    message: "",
                  },
                });
            }
          }

          // currentPage &&
          //   updateRules(currentPage, field.fieldId, {
          //     [e]: {
          //       value: "",
          //       message: "",
          //     },
          //   });
        }}
      />
      {fieldRules.length > 0 && (
        <List
          className="validation-input-list"
          dataSource={fieldRules}
          renderItem={({ key, message, type, value }) => {
            const Component = PROPERTY_FIELD_COMPONENT_MAP[type];
            return (
              <List.Item key={key}>
                <Component
                  id={key}
                  name={key}
                  value={value}
                  label={`Enter ${key} value`}
                  onChange={(e: any) => {
                    currentPage &&
                      updateRules(currentPage, field.fieldId, {
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
                    currentPage &&
                      updateRules(currentPage, field.fieldId, {
                        [key]: {
                          value,
                          message: e.target.value,
                        },
                      });
                  }}
                />
              </List.Item>
            );
          }}
        />
      )}
    </StyledValidationInput>
  );
};
