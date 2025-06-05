import styled from "styled-components";

export const StyledFormBuilder = styled.div`
  display: grid;
  grid-template-columns: 20% 60% 20%;
  margin: auto;
  height: inherit;
  overflow: hidden;
  width: 100%;
`;

export const StyledHeader = styled.div`
  grid-row: 1/1;
  grid-column: 1 / -1;
  background: #fff;
  border-bottom: 1px solid #d6d6d6;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
`;

export const StyledElementPanel = styled.div`
  padding: 1.5rem;
  background: rgb(255, 255, 255);
  overflow: auto;
`;

export const StyledElementGroup = styled.div``;

export const StyledElementTitle = styled.div`
  margin-bottom: 0.5rem;
  color: #474545;
`;

export const StyledElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const StyledElement = styled.div`
  display: flex;
  border: 1px solid #d9d9d9;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  gap: 10px;
  :hover {
    cursor: move;
  }
`;

export const StyledBuilder = styled.div`
  height: 100%;
  margin: auto 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 1rem;
`;

export const StyledSortableElement = styled.div`
  border: 1px solid rgb(229, 231, 235);
  padding: 1rem;
  border-radius: 6px;
  position: relative;
`;

export const StyledPropertyPanel = styled.div`
  padding: 1.5rem;
  background: rgb(255, 255, 255);
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  & label {
    font-size: 0.8rem;
  }
`;

export const StyledSortableElementOverlay = styled.div`
  border: 1px solid rgb(143, 86, 232);
  padding: 10px;
  border-radius: 8px;
  position: relative;
  cursor: move;
  font-size: 0.8rem;
`;

export const StyledFormNameContainer = styled.div`
  flex: 1;
`;

export const StyledHeaderControls = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

export const StyledFormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const StyledFormPageName = styled.div`
  margin-bottom: 1rem;
  font-weight: 500;
  font-size: 0.8rem;
`;

export const StyledPageNavigation = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
`;

export const StyledFormPage = styled.div`
  background: rgb(255, 255, 255);
  padding: 1.5rem;
  border-radius: 10px;
`;

export const StyledAddNewPage = styled.div`
  width: 100%;
  font-size: 0.8rem;
  color: rgb(143, 86, 232);
  position: relative;
  text-align: center;
  &::before {
    content: "";
    height: 1px;
    position: absolute;
    border: 1px dashed #d5d5d5;
    top: 50%;
    left: 0;
    right: 0;
  }
`;

export const StyledAddPageLabel = styled.span`
  background: rgb(241, 243, 249);
  position: relative;
  z-index: 10;
  display: inline-flex;
  align-items: center;
  background: rgb(230, 214, 255);
  border-radius: 4px;
  padding: 5px 10px;
  &:hover {
    cursor: pointer;
  }
`;
