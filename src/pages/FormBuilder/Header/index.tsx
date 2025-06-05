import React from "react";
import {
  StyledFormNameContainer,
  StyledHeader,
  StyledHeaderControls,
} from "../index.style";
import { useFormBuilderStore } from "../../../store/FormBuilderStore";
import SingleLineInput from "../../../components/inputs_v1/singlelineinput";
import PreviewButton from "../../FormPreview/PreviewButton";
import { Button } from "antd";

const Header = () => {
  const {
    formMetaData: { formName },
    updateFormProperties,
  } = useFormBuilderStore();
  return (
    <StyledHeader>
      <StyledFormNameContainer>
        <SingleLineInput
          defaultValue={formName}
          onBlur={(e) => {
            updateFormProperties({ formName: e.target.value });
          }}
        />
      </StyledFormNameContainer>
      <HeaderControls />
    </StyledHeader>
  );
};

const HeaderControls = () => {
  return (
    <StyledHeaderControls>
      <PreviewButton />
      <Button type="primary">Save</Button>
    </StyledHeaderControls>
  );
};

export default React.memo(Header);
