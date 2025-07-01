import React, { useCallback } from "react";
import { BuilderControls } from ".";
import SingleLineInput from "../../../components/inputs_v1/singlelineinput";
import { useFormBuilderStore } from "../../../store/FormBuilderStore";
import { IFieldControlsProps } from "./type";
import { generateUniqueId } from "../../../utils/util";
import { Field } from "../../../models/Form";

export const FieldControls: React.FC<IFieldControlsProps> = React.memo(
  ({ label, page, field, activeIndex }) => {
    const {
      updateFieldProperties,
      insertField,
      removeField,
      setActiveElement,
    } = useFormBuilderStore();

    const onClick = useCallback(
      (action: string) => {
        if (action === "copy") {
          const uniqueId = generateUniqueId();
          const newField = {
            ...field.toJSON(),
            fieldId: uniqueId,
            fieldName: `${field.label}_${uniqueId}`,
          };
          insertField(page, newField, activeIndex + 1);
          setActiveElement({ type: "field", data: newField as Field });
        } else if (action === "delete") {
          removeField(page, field.fieldId);
        }
      },
      [field, page, activeIndex]
    );

    return (
      <>
        <BuilderControls onClick={onClick} className="field-controls" />
        <SingleLineInput
          value={label}
          style={{
            marginBottom: "0.5rem",
            padding: "0",
            backgroundColor: "transparent",
          }}
          onChange={(e) => {
            updateFieldProperties(page, field.fieldId, {
              label: e.target.value,
            });
          }}
        />
      </>
    );
  }
);
