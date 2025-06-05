import { FIELD_COMPONENT_MAP } from "./constant";
import Form from ".";
import { StyledFormField } from "./index.style";
import { IField } from "./type";

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
  const { properties, fieldId, fieldName, pageId, ...fieldProps } = props;
  const FieldRenderer = FIELD_COMPONENT_MAP[fieldProps.type];
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
          {...fieldProps}
          {...properties}
        />
      </Form.Control>
    </StyledFormField>
  );
};

export default FormFields;
