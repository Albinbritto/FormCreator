import { Button, Steps } from "antd";
import { StyledFormPage } from "../../pages/FormBuilder/index.style";
import FormFields from "./FormFields";
import { StyledFormNavigation, StyledFormPageWrapper } from "./index.style";
import { ButtonPositionType, IPage } from "./type";
import { useMemo, useState } from "react";

const FormPages: React.FC<{ pages: IPage[]; isMultiStep?: boolean }> = (
  props
) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { pages, isMultiStep = false } = props;
  function handleNext() {
    setActiveIndex((prev) => Math.min(prev + 1, pages.length - 1));
  }

  function handlePrev() {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  }

  const activePages = useMemo(
    function () {
      if (isMultiStep) {
        return [pages[activeIndex]];
      }
      return pages;
    },
    [activeIndex, isMultiStep, pages]
  );
  return (
    <StyledFormPageWrapper>
      {isMultiStep && (
        <Steps
          items={pages.map(({ pageName }) => ({ title: pageName }))}
          current={activeIndex}
        />
      )}
      {activePages.map(
        ({ pageId, fields, nextLabel, prevLabel, buttonPosition }) => {
          return (
            <StyledFormPage id={pageId} key={pageId}>
              <FormFields fields={fields} />
              {isMultiStep && (
                <FormNavigation
                  handleNext={handleNext}
                  handlePrev={handlePrev}
                  nextLabel={nextLabel}
                  prevLabel={prevLabel}
                  buttonPosition={buttonPosition}
                />
              )}
            </StyledFormPage>
          );
        }
      )}
    </StyledFormPageWrapper>
  );
};

const FormNavigation: React.FC<{
  handleNext: () => void;
  handlePrev: () => void;
  nextLabel?: string;
  prevLabel?: string;
  buttonPosition?: ButtonPositionType;
}> = (props) => {
  const {
    handleNext,
    handlePrev,
    nextLabel,
    prevLabel,
    buttonPosition = "space-between",
  } = props;
  return (
    <StyledFormNavigation style={{ justifyContent: buttonPosition }}>
      <Button type="primary" onClick={() => handlePrev()} htmlType="submit">
        {prevLabel || "Prev"}
      </Button>
      <Button type="primary" onClick={() => handleNext()} htmlType="submit">
        {nextLabel || "Next"}
      </Button>
    </StyledFormNavigation>
  );
};

export default FormPages;
