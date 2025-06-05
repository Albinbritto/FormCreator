import React from "react";
import { IFormEngine, IMultiStepForm } from "./type";
import Form from ".";
import FormPages from "./FormPages";
import { Button } from "antd";

const FormEngine: React.FC<IFormEngine> & {
  MultiStep: React.FC<IMultiStepForm>;
} = ({ dataSource, onSubmit, values }) => {
  const { pages } = dataSource;
  return (
    <Form onSubmit={onSubmit} defaultValues={values}>
      <FormPages pages={pages} />
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

const MultiStep: React.FC<IMultiStepForm> = ({
  dataSource,
  onSubmit,
  header,
  footer,
  ...restProps
}) => {
  const { pages } = dataSource;
  const props = { ...restProps, pages };

  return (
    <Form onSubmit={onSubmit} defaultValues={restProps.values}>
      <FormPages {...props} pages={pages} isMultiStep={true} />
    </Form>
  );
};

FormEngine.MultiStep = MultiStep;

export default FormEngine;
