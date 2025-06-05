import React from "react";
import { StyledPropertyPanel } from "../index.style";
import { useFormBuilderStore } from "../../../store/FormBuilderStore";
import Input from "../../../components/inputs_v1/input";
import { Field, Page } from "../../../models/Form";
import Radio from "../../../components/inputs_v1/radio";
import { PROPERTY_FIELD_COMPONENT_MAP } from "./constant";

const PropertyPanel = () => {
  const { activeElement } = useFormBuilderStore();

  function renderPropertyPanel() {
    if (activeElement) {
      const { type, data } = activeElement;
      if (type === "field") {
        return <FieldProperty field={data as Field} />;
      } else if (type === "page") {
        return <PageProperty page={data as Page} />;
      }
    }
  }

  return (
    <StyledPropertyPanel onClick={(e) => e.stopPropagation()}>
      {renderPropertyPanel()}
    </StyledPropertyPanel>
  );
};

const FieldProperty: React.FC<{ field: Field }> = React.memo(({ field }) => {
  const { updateFieldProperties, formMetaData } = useFormBuilderStore();
  return field.getProperties().map((property) => {
    const { id, label, type, value, options, name, disabled, pageId, fieldId } =
      property;
    const FieldComponent = PROPERTY_FIELD_COMPONENT_MAP[type];
    return (
      <FieldComponent
        key={id}
        label={label}
        name={name}
        value={value}
        options={options}
        disabled={disabled}
        field={field}
        onChange={(e: any) => {
          const activePage = formMetaData.findPage(pageId);
          activePage &&
            updateFieldProperties(activePage, fieldId, {
              [name]: e?.target?.value === undefined ? e : e.target.value,
            });
        }}
      />
    );
  });
});

const PageProperty: React.FC<{ page: Page }> = ({ page }) => {
  const { updatePageProperties } = useFormBuilderStore();
  const { pageName, pageId, prevLabel, nextLabel, buttonPosition } = page;
  return (
    <>
      <Input
        label="Edit Page Title"
        id="pageTitle"
        name="pageTitle"
        value={pageName}
        onChange={(e) => {
          updatePageProperties(page, {
            pageName: e.target.value,
          });
        }}
      />
      <Input
        label="Prev Label"
        id="prevLabel"
        name="prevLabel"
        value={prevLabel}
        onChange={(e) => {
          updatePageProperties(page, {
            prevLabel: e.target.value,
          });
        }}
      />
      <Input
        label="Next Label"
        id="nextLabel"
        name="nextLabel"
        value={nextLabel}
        onChange={(e) => {
          updatePageProperties(page, {
            nextLabel: e.target.value,
          });
        }}
      />
      <Radio
        label="Button Position"
        value={buttonPosition}
        onChange={(e) => {
          console.log(e.target.value);
          updatePageProperties(page, {
            buttonPosition: e.target.value,
          });
        }}
        options={[
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
          { label: "Center", value: "center" },
          { label: "default", value: "space-between" },
        ]}
      />
      <Input
        label="Page Id"
        id="pageId"
        name="pageId"
        value={pageId}
        disabled
      />
    </>
  );
};

export default React.memo(PropertyPanel);
