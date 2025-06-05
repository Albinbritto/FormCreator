import React, { cloneElement } from "react";
import { StyledFormContainer } from "./index.style";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";

import { IForm, IFormControl } from "./type";

const Form: React.FC<IForm> & { Control: React.FC<IFormControl> } = ({
  children,
  defaultValues,
  onSubmit,
  style = {},
  className = "",
}) => {
  const methods = useForm({ defaultValues, mode: "all" });
  return (
    <FormProvider {...methods}>
      <StyledFormContainer
        onSubmit={methods.handleSubmit(onSubmit || (() => {}))}
        style={style}
        className={className}
      >
        {children}
      </StyledFormContainer>
    </FormProvider>
  );
};

const FormControl: React.FC<IFormControl> = ({
  children,
  name,
  label = "",
  rules,
}) => {
  const { control } = useFormContext();
  console.log("rules", rules);
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: true,
        min: {
          value: 5,
          message: "Minimum length is 5",
        },
      }}
      render={({ field: { onChange, onBlur, value }, fieldState }) => {
        const { invalid, error } = fieldState;
        return cloneElement(children, {
          label,
          onChange,
          value: value || children.props.value,
          onBlur,
          status: invalid ? "error" : "",
          error,
        });
      }}
    />
  );
};

Form.Control = FormControl;

export default Form;
