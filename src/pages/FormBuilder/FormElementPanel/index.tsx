import React from "react";
import { HolderOutlined } from "@ant-design/icons";
import { useDraggable } from "@dnd-kit/core";
import Icon from "../../../components/Icon";
import {
  StyledElement,
  StyledElementContainer,
  StyledElementGroup,
  StyledElementPanel,
  StyledElementTitle,
} from "../index.style";

import { useFormBuilderStore } from "../../../store/FormBuilderStore";
import { FormElement } from "../type";

const ElementPanel = () => {
  const formElements = useFormBuilderStore((state) => state.formElements);

  return (
    <StyledElementPanel>
      {Object.values(formElements).map(({ title, elements }) => {
        return (
          <StyledElementGroup key={title}>
            <StyledElementTitle>{title}</StyledElementTitle>
            <StyledElementContainer>
              {elements.map((el) => {
                return <Element {...el} key={el.id} />;
              })}
            </StyledElementContainer>
          </StyledElementGroup>
        );
      })}
    </StyledElementPanel>
  );
};

export const Element: React.FC<FormElement> = (props) => {
  const { Icon: iconName, label, id } = props;
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: { ...props, dndType: "element" },
  });

  return (
    <StyledElement ref={setNodeRef} {...listeners} {...attributes}>
      <Icon
        name={iconName}
        style={{
          background: "rgb(230, 214, 255)",
          borderRadius: "2px",
          padding: "4px",
        }}
      />
      <span>{label}</span>
      <div style={{ flex: 1, textAlign: "end" }}>
        <HolderOutlined />
      </div>
    </StyledElement>
  );
};

export default React.memo(ElementPanel);
