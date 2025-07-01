import React, { useMemo } from "react";
import { StyledPropertyPanel } from "../index.style";
import { useFormBuilderStore } from "../../../store/FormBuilderStore";
import { Field, Page } from "../../../models/Form";
import { PROPERTY_FIELD_COMPONENT_MAP } from "./constant";
import { List } from "antd";

const PropertyPanel = () => {
  return (
    <StyledPropertyPanel onClick={(e) => e.stopPropagation()}>
      <PropertyPanelRenderer />
    </StyledPropertyPanel>
  );
};

const PropertyPanelRenderer = () => {
  const { activeElement } = useFormBuilderStore();

  if (activeElement) {
    const { type, data } = activeElement;
    if (type === "field") {
      return <FieldProperty field={data as Field} />;
    } else if (type === "page") {
      return <PageProperty page={data as Page} />;
    }
  }
  return <div>No Property Found</div>;
};

const FieldProperty: React.FC<{ field: Field }> = React.memo(({ field }) => {
  const { updateFieldProperties, formMetaData } = useFormBuilderStore();

  const datasource = useMemo(() => {
    return field.getProperties();
  }, [field]);

  const currentPage = useMemo(() => {
    return formMetaData.findPage(field.pageId);
  }, [formMetaData, field.pageId]);

  return (
    <List
      className="field-property-list"
      dataSource={datasource}
      renderItem={(item) => {
        const { id, label, type, value, options, name, disabled } = item;
        const FieldComponent = PROPERTY_FIELD_COMPONENT_MAP[type];
        return (
          <List.Item key={id}>
            <FieldComponent
              label={label}
              name={name}
              id={id}
              value={value}
              checked={value}
              options={options}
              disabled={disabled}
              field={field}
              onChange={(e: any) => {
                currentPage &&
                  updateFieldProperties(currentPage, field.fieldId, {
                    [name]: e?.target?.value === undefined ? e : e.target.value,
                  });
              }}
            />
          </List.Item>
        );
      }}
    />
  );
});

const CONDITIONAL_FIELDS = ["buttonPosition", "nextLabel", "prevLabel"];

const PageProperty: React.FC<{ page: Page }> = React.memo(({ page }) => {
  const { updatePageProperties, formMetaData } = useFormBuilderStore();

  const datasource = useMemo(() => {
    return page.getProperties();
  }, [page]);

  return (
    <List
      className="field-property-list"
      dataSource={datasource}
      renderItem={(item) => {
        const { id, label, type, value, options, name, disabled } = item;
        const hide =
          CONDITIONAL_FIELDS.includes(id) && formMetaData.pages.length === 1
            ? true
            : false;
        const FieldComponent = PROPERTY_FIELD_COMPONENT_MAP[type];
        return !hide ? (
          <List.Item key={id}>
            <FieldComponent
              label={label}
              name={name}
              id={id}
              value={value}
              options={options}
              disabled={disabled}
              onChange={(e: any) => {
                updatePageProperties(page, {
                  [name]: e?.target?.value === undefined ? e : e.target.value,
                });
              }}
            />
          </List.Item>
        ) : (
          <></>
        );
      }}
    />
  );
});

export default React.memo(PropertyPanel);
