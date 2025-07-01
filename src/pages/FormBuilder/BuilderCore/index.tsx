import React, { useEffect, useMemo } from "react";
import { FIELD_COMPONENT_MAP } from "../../../components/Form/constant";
import {
  StyledBuilder,
  StyledFormFields,
  StyledFormPageName,
  StyledPageNavigation,
  StyledPageWrapper,
} from "../index.style";
import SingleLineInput from "../../../components/inputs_v1/singlelineinput";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DroppableContainer } from "../DroppableContainer";
import SortableElement from "../SortableElement";
import { IFieldMetaData } from "../type";
import { Field, Page } from "../../../models/Form";
import { useFormBuilderStore } from "../../../store/FormBuilderStore";
import { Button } from "antd";
import { ButtonPositionType } from "../../../components/Form/type";
import { FieldControls } from "../BuilderControls/FieldControls";
import { PageControls } from "../BuilderControls/PageControls";
import { AddNewPage } from "../BuilderControls/AddNewPage";

const BuilderCore: React.FC = () => {
  const { formMetaData, setActiveElement, activeElement } =
    useFormBuilderStore();
  const { formId, pages } = formMetaData;

  console.log("inside BuilderCore....");

  function resetActiveField() {
    setActiveElement(null);
  }

  useEffect(() => {
    window.addEventListener("click", resetActiveField);
    return () => {
      window.removeEventListener("click", resetActiveField);
    };
  }, []);

  console.log("formMetaData:", formMetaData);

  return (
    <StyledBuilder id={formId}>
      {pages.map((page, index) => {
        const isActive =
          activeElement?.type === "page" &&
          (activeElement.data as Page)?.pageId === page.pageId;
        return (
          <>
            <StyledPageWrapper
              key={page.pageId}
              onClick={(e) => {
                e.stopPropagation();
                setActiveElement({ data: page, type: "page" });
              }}
              isActive={isActive}
            >
              {isActive && <PageControls page={page} />}
              <SortableContext
                key={page.pageId}
                items={page.fields.map(({ fieldId }) => fieldId)}
                strategy={verticalListSortingStrategy}
              >
                <FormPage key={page.pageId} page={page} />
              </SortableContext>
            </StyledPageWrapper>
            {/* <AddNewPage index={index} /> */}
          </>
        );
      })}
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
    isDropdown,
    type = "fallback",
    ...restProps
  } = field.toJSON();

  const fieldType = useMemo(() => {
    if (isDropdown && type === "singlechoice") {
      return "select";
    } else if (isDropdown && type === "multichoice") {
      return "multiselect";
    } else {
      return type;
    }
  }, [type, isDropdown]);

  const FieldRenderer = FIELD_COMPONENT_MAP[fieldType];
  const { activeElement } = useFormBuilderStore();

  const isActive = React.useMemo(() => {
    return (
      activeElement?.type === "field" &&
      (activeElement.data as IFieldMetaData)?.fieldId === fieldId
    );
  }, [activeElement, fieldId]);

  return (
    <SortableElement pageId={pageId} field={field}>
      {isActive && (
        <FieldControls
          activeIndex={index}
          field={field}
          label={label}
          page={page}
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
