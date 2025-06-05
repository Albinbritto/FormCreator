import React, { useEffect } from "react";
import { FIELD_COMPONENT_MAP } from "../../../components/Form/constant";
import {
  StyledBuilder,
  StyledFormFields,
  StyledFormPageName,
  StyledPageNavigation,
} from "../index.style";
import SingleLineInput from "../../../components/inputs_v1/singlelineinput";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DroppableContainer } from "../DroppableContainer";
import SortableElement from "../SortableElement";
import { IFieldMetaData } from "../type";
import AddNewPage from "../Actions/AddNewPage";
import { Field, Page } from "../../../models/Form";
import { useFormBuilderStore } from "../../../store/FormBuilderStore";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineDelete } from "react-icons/ai";
import { StyledActiveElementControl } from "../../../components/Form/index.style";
import { Button } from "antd";
import { ButtonPositionType } from "../../../components/Form/type";

const BuilderCore: React.FC = () => {
  const { formMetaData, addPage, setActiveElement, activeElement, removePage } =
    useFormBuilderStore();
  const { formId, pages } = formMetaData;

  console.log("formMetaData",formMetaData);

  function resetActiveField() {
    setActiveElement(null);
  }

  useEffect(() => {
    window.addEventListener("click", resetActiveField);
    return () => {
      window.removeEventListener("click", resetActiveField);
    };
  }, []);

  return (
    <StyledBuilder id={formId}>
      {pages.map((page, index) => (
        <>
          <div
            key={page.pageId}
            onClick={(e) => {
              e.stopPropagation();
              setActiveElement({ data: page, type: "page" });
            }}
            style={{
              border: `1px solid ${
                activeElement?.type === "page" &&
                (activeElement.data as Page)?.pageId === page.pageId
                  ? "rgb(143, 86, 232)"
                  : "transparent"
              }`,
              borderRadius: "10px",
              position: "relative",
            }}
          >
            {activeElement?.type === "page" &&
              (activeElement.data as Page)?.pageId === page.pageId && (
                <StyledActiveElementControl
                  style={{ top: "-12px", right: "5px", cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    removePage(page.pageId);
                  }}
                >
                  <AiOutlineDelete className="active-element-trigger" />
                </StyledActiveElementControl>
              )}
            <SortableContext
              key={page.pageId}
              items={page.fields.map(({ fieldId }) => fieldId)}
              strategy={verticalListSortingStrategy}
            >
              <FormPage key={page.pageId} page={page} />
            </SortableContext>
          </div>
          <AddNewPage
            onClick={() => {
              addPage(
                new Page({
                  prevLabel: "prev",
                  nextLabel: "next",
                  pageName: "Untitled Page",
                }),
                index + 1
              );
            }}
          />
        </>
      ))}
    </StyledBuilder>
  );
};

const FormPage: React.FC<{ page: Page }> = ({ page }) => {
  const { pageName, fields, pageId, nextLabel, prevLabel, buttonPosition } =
    page;
  return (
    <DroppableContainer id={pageId}>
      <PageName pageName={pageName} page={page} />
      <StyledFormFields>
        {fields.map((field, index) => (
          <FormField
            key={field.fieldId}
            field={field}
            page={page}
            index={index}
          />
        ))}
      </StyledFormFields>
      <PageNavigation
        nextLabel={nextLabel}
        prevLabel={prevLabel}
        buttonPosition={buttonPosition}
      />
    </DroppableContainer>
  );
};

const PageNavigation: React.FC<{
  nextLabel?: string;
  prevLabel?: string;
  buttonPosition: ButtonPositionType;
}> = ({ prevLabel, nextLabel, buttonPosition }) => {
  return (
    <StyledPageNavigation style={{ justifyContent: buttonPosition }}>
      {prevLabel !== undefined && <Button type="primary">{prevLabel}</Button>}
      {nextLabel !== undefined && <Button type="primary">{nextLabel}</Button>}
    </StyledPageNavigation>
  );
};

const PageName: React.FC<{ pageName: string; page: Page }> = ({
  pageName,
  page,
}) => {
  const { updatePageProperties } = useFormBuilderStore();
  return (
    <StyledFormPageName>
      <SingleLineInput
        value={pageName}
        onChange={(e) => {
          updatePageProperties(page, { pageName: e.target.value });
        }}
      />
    </StyledFormPageName>
  );
};

const FormField: React.FC<{ field: Field; page: Page; index: number }> = ({
  field,
  page,
  index,
}) => {
  const {
    fieldId,
    fieldName,
    pageId,
    label,
    properties,
    type = "fallback",
    ...restProps
  } = field.toJSON();
  const FieldRenderer = FIELD_COMPONENT_MAP[type];
  const { insertField, removeField, activeElement, updateFieldProperties } =
    useFormBuilderStore();

  const isActive = React.useMemo(() => {
    return (
      activeElement?.type === "field" &&
      (activeElement.data as IFieldMetaData)?.fieldId === fieldId
    );
  }, [activeElement, fieldId]);

  return (
    <SortableElement
      pageId={pageId}
      field={field}
      handleCopy={() => {
        const newField = { ...field.toJSON(), fieldId: uuidv4() };
        insertField(page, newField, index + 1);
      }}
      handleDelete={() => {
        removeField(page, fieldId);
      }}
    >
      {isActive && (
        <SingleLineInput
          value={label}
          style={{
            marginBottom: "0.5rem",
            padding: "0",
            backgroundColor: "transparent",
          }}
          onChange={(e) => {
            updateFieldProperties(page, fieldId, { label: e.target.value });
          }}
        />
      )}
      <FieldRenderer
        {...restProps}
        {...properties}
        type={type}
        name={fieldName}
        id={fieldId}
        label={isActive ? "" : label}
        style={{ pointerEvents: "none" }}
      />
    </SortableElement>
  );
};

export default BuilderCore;
