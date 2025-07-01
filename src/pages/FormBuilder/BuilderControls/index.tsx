import React, { useMemo } from "react";
import { AiFillSetting, AiOutlineCopy, AiOutlineDelete } from "react-icons/ai";
import { ControlConfig, ControlsProps } from "./type";
import { StyledControls, StyledIconButton } from "./index.style";

const CONTROL_ELEMENTS: ControlConfig[] = [
  { action: "setting", icon: AiFillSetting, controlsFor: ["field"] },
  { action: "copy", icon: AiOutlineCopy, controlsFor: ["field"] },
  { action: "delete", icon: AiOutlineDelete, controlsFor: ["field", "page"] },
];

export const BuilderControls: React.FC<ControlsProps> = React.memo(
  ({ onClick, type = "field", className = "" }) => {
    const controls = useMemo(
      () =>
        CONTROL_ELEMENTS.filter((control) =>
          control.controlsFor.includes(type)
        ),
      [type]
    );

    return (
      <StyledControls className={`${className}`}>
        {controls.map(({ action, icon: Icon }) => (
          <StyledIconButton
            key={action}
            type="button"
            aria-label={action}
            className="active-element-trigger"
            onClick={() => onClick?.(action)}
          >
            <Icon />
          </StyledIconButton>
        ))}
      </StyledControls>
    );
  }
);
