import { useCallback } from "react";
import FormEngine from "../../components/Form/FormEngine";
import { useFormBuilderStore } from "../../store/FormBuilderStore";

const FormPreview = () => {
  const formMetaData = useFormBuilderStore((state) => state.formMetaData);
  const isMultiStep = formMetaData.pages.length > 1;

  console.log("Form metadata:", formMetaData.toJSON());

  const handleSubmit = useCallback((data: any) => {
    console.log("Form submitted with data:", data);
  }, []);

  const PreviewComponent = isMultiStep ? FormEngine.MultiStep : FormEngine;

  return (
    <div style={{ width: "60%", margin: "1rem auto" }}>
      <PreviewComponent
        dataSource={formMetaData.toJSON()}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default FormPreview;
