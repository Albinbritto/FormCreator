import React, { ReactNode, useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FIELD_COMPONENT_MAP } from "../../../components/Form/constant";
import {
  StyledActiveElementControl,
  StyledFormField,
} from "../../../components/Form/index.style";
import { StyledSortableElementOverlay } from "../index.style";
import { IFieldMetaData } from "../type";
import { useFormBuilderStore } from "../../../store/FormBuilderStore";
import { HolderOutlined } from "@ant-design/icons";
import { AiFillSetting, AiOutlineCopy } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { Field } from "../../../models/Form";

const SortableElement: React.FC<{
  field: Field;
  children: ReactNode;
  pageId: string;
  handleCopy: () => void;
  handleDelete: () => void;
}> = ({ field, children, pageId, handleCopy, handleDelete }) => {
  const { fieldId } = field;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: fieldId,
    data: {
      pageId,
      dndType: "item",
      sortable: true,
      field,
    },
  });
  const { activeElement, setActiveElement } = useFormBuilderStore();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  const isActive = useMemo(() => {
    return (
      activeElement?.type === "field" &&
      (activeElement.data as IFieldMetaData)?.fieldId === fieldId
    );
  }, [activeElement, fieldId]);

  return (
    <StyledFormField
      key={fieldId}
      ref={setNodeRef}
      style={style}
      id={fieldId}
      isActive={isActive}
      onClick={(e) => {
        e.stopPropagation();
        setActiveElement({ data: field, type: "field" });
      }}
      className="sortable-element"
    >
      {isActive && (
        <>
          <HolderOutlined
            className="drag-icon"
            {...attributes}
            {...listeners}
          />
          <StyledActiveElementControl style={{ top: "-12px", right: "65px" }}>
            <AiFillSetting />
          </StyledActiveElementControl>

          <StyledActiveElementControl
            style={{ top: "-12px", right: "35px" }}
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
          >
            <AiOutlineCopy className="active-element-trigger" />
          </StyledActiveElementControl>
          <StyledActiveElementControl
            style={{ top: "-12px", right: "5px" }}
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            <AiOutlineDelete className="active-element-trigger" />
          </StyledActiveElementControl>
        </>
      )}
      {children}
    </StyledFormField>
  );
};

export const SortableElementOverlay: React.FC<IFieldMetaData> = (props) => {
  const FieldRenderer =
    FIELD_COMPONENT_MAP[props.type] || (() => <div>Unsupported Element</div>);
  const { fieldId, fieldName, pageId, ...restProps } = props;

  return (
    <StyledSortableElementOverlay>
      <HolderOutlined className="drag-icon" />
      <FieldRenderer {...restProps} style={{ pointerEvents: "none" }} />
    </StyledSortableElementOverlay>
  );
};

export default React.memo(SortableElement);
