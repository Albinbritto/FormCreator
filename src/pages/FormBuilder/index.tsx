import { ReactNode, useRef, useState } from "react";
import ElementPanel from "./FormElementPanel";
import PropertyPanel from "./PropertyPanel";
import Header from "./Header";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useFormBuilderStore } from "../../store/FormBuilderStore";
import { StyledElement, StyledFormBuilder } from "./index.style";
import { SortableElementOverlay } from "./SortableElement";
import BuilderCore from "./BuilderCore";
import { FormElement } from "./type";
import { HolderOutlined } from "@ant-design/icons";
import Icon from "../../components/Icon";
import { v4 as uuidv4 } from "uuid";
import { Form } from "../../models/Form";

const FormBuilder = () => {
  return (
    <DndWrapper>
      <StyledFormBuilder>
        <Header />
        <ElementPanel />
        <BuilderCore />
        <PropertyPanel />
      </StyledFormBuilder>
    </DndWrapper>
  );
};

const DndWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    formMetaData,
    updateMetaData,
    updateFormElement,
    insertField,
    moveField,
    swapFieldBetweenPage,
  } = useFormBuilderStore();
  const [activeElement, setActiveElement] = useState<any>(null);
  const recentlyMovedToNewContainer = useRef(false);
  const [clonedMetaData, setClonedMetaData] = useState<Form | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { data } = event.active;
    const currentData = data.current;
    if (!currentData) return;
    setActiveElement(event.active);
    setClonedMetaData(formMetaData.clone());
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const activeId = active.id.toString();

    if (!over || over.id === null) {
      return;
    }

    const overId = over.id.toString();
    const overPage = formMetaData.findPage(overId);
    const activePage = formMetaData.findPage(activeId);

    if (!overPage) {
      return;
    }

    if (!activePage && active.data.current?.dndType === "element") {
      const overFields = overPage.fields;
      const overIndex = overFields.findIndex(
        ({ fieldId }) => fieldId === overId
      );

      let newIndex: number;
      const isBelowOverItem =
        over &&
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;

      newIndex = overIndex >= 0 ? overIndex + modifier : overFields.length + 1;

      recentlyMovedToNewContainer.current = true;

      const { label, id, name, dndType, Icon, ...rest } =
        activeElement.data.current;

      insertField(
        overPage,
        {
          label,
          fieldId: id,
          fieldName: name,
          pageId: overPage.pageId,
          ...rest,
        },
        newIndex
      );
      return;
    }

    if (!activePage) {
      return;
    }

    if (activePage !== overPage) {
      const activeFields = activePage.fields;
      const overFields = overPage.fields;
      const overIndex = overFields.findIndex(
        ({ fieldId }) => fieldId === overId
      );
      const activeIndex = activeFields.findIndex(
        ({ fieldId }) => fieldId === activeId
      );

      let newIndex: number;
      const isBelowOverItem =
        over &&
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;

      newIndex = overIndex >= 0 ? overIndex + modifier : overFields.length + 1;

      recentlyMovedToNewContainer.current = true;
      swapFieldBetweenPage(
        activePage,
        activeId,
        overPage,
        activeFields[activeIndex],
        newIndex
      );
    }
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (activeElement.data.current?.dndType === "element") {
      const { dndType, id, ...rest } = activeElement.data.current;
      updateFormElement(
        {
          ...rest,
          id: uuidv4(),
        },
        id
      );
    }
    const activeId = active.id.toString();
    const activePage = formMetaData.findPage(activeId);
    const overId = over?.id;

    if (!activePage || overId == null) {
      setActiveElement(null);
      return;
    }

    const overPage = formMetaData.findPage(overId.toString());

    if (overPage) {
      const activeIndex = activePage.fields.findIndex(
        ({ fieldId }) => fieldId === activeId
      );
      const overIndex = overPage.fields.findIndex(
        ({ fieldId }) => fieldId === overId
      );

      activePage.fields[activeIndex].pageId = overPage.pageId;
      moveField(overPage, activeIndex, overIndex);
    }
    setActiveElement(null);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={onDragEnd}
      cancelDrop={(event) => event.over === null}
      onDragCancel={() => {
        if (
          clonedMetaData &&
          activeElement.data.current?.dndType === "element"
        ) {
          updateMetaData(clonedMetaData);
          setClonedMetaData(null);
          const { dndType, id, ...rest } = activeElement.data.current;
          updateFormElement(
            {
              ...rest,
              id: uuidv4(),
            },
            id
          );
        }
      }}
    >
      {children}
      {activeElement && (
        <DragOverlay>
          {activeElement.data.current.sortable ? (
            <SortableElementOverlay {...activeElement.data.current.field} />
          ) : (
            <DraggableElementOverlay {...activeElement.data.current} />
          )}
        </DragOverlay>
      )}
    </DndContext>
  );
};

const DraggableElementOverlay: React.FC<FormElement> = (props) => {
  const { Icon: iconName, label } = props;

  return (
    <StyledElement>
      <Icon name={iconName} />
      <span>{label}</span>
      <div style={{ flex: 1, textAlign: "end" }}>
        <HolderOutlined />
      </div>
    </StyledElement>
  );
};

export default FormBuilder;
