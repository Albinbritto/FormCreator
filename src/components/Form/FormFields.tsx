import { FIELD_COMPONENT_MAP } from "./constant";
import Form from ".";
import { StyledFormField } from "./index.style";
import { IField } from "./type";
import { useMemo } from "react";

const FormFields: React.FC<{ fields: IField[] }> = (props) => {
  const { fields = [] } = props;

  return (
    <div>
      {fields.map((field) => {
        return <FormField {...field} />;
      })}
    </div>
  );
};

export const FormField: React.FC<IField> = (props) => {
  const {
    properties,
    fieldId,
    fieldName,
    pageId,
    type,
    isDropdown,
    ...fieldProps
  } = props;
  const fieldType = useMemo(() => {
    if (isDropdown && type === "singlechoice") {
      return "select";
    } else if (isDropdown && type === "multichoice") {
      return "multiselect";
    } else {
      return type;
    }
  }, [type]);

  console.log("fieldType", fieldType);

  const FieldRenderer = FIELD_COMPONENT_MAP[fieldType];

  return (
    <StyledFormField key={props.fieldId}>
      <Form.Control
        name={props.fieldName}
        label={props.label}
        rules={props.rules}
      >
        <FieldRenderer
          id={fieldId}
          name={fieldName}
          type={fieldType}
          {...fieldProps}
          {...properties}
        />
      </Form.Control>
    </StyledFormField>
  );
};

export default FormFields;
