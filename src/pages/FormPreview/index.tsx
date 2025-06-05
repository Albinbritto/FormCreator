import FormEngine from "../../components/Form/FormEngine";
import { useFormBuilderStore } from "../../store/FormBuilderStore";

const FormPreview = () => {
  const { formMetaData } = useFormBuilderStore();
  const isMultiStep = formMetaData.pages.length > 1;
  console.log("formMetaData", formMetaData);

  return (
    <div style={{ width: "90%", margin: "1rem auto" }}>
      {isMultiStep ? (
        <FormEngine.MultiStep
          dataSource={formMetaData.toJSON()}
          onSubmit={(data) => {
            console.log("data", data);
          }}
        />
      ) : (
        <FormEngine
          dataSource={formMetaData.toJSON()}
          onSubmit={(data) => {
            console.log("data", data);
          }}
        />
      )}
    </div>
  );
};

export default FormPreview;
