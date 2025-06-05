import styled from "styled-components";

export const StyledFormContainer = styled.form`
  width: 100%;
`;

export const StyledFormSectionName = styled.h4`
  font-weight: 500;
  color: #3f3d3d;
  background: #f8f7f7;
`;

export const StyledFormPageWrapper = styled.div`
  height: 100%;
  margin: auto 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export const StyledActiveElementControl = styled.div`
  padding: 5px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  width: 25px;
  height: 25px;
  background: rgb(230, 214, 255);
  border-radius: 50%;
`;

export const StyledFormField = styled.div<{
  isActive?: boolean;
}>`
  font-size: 0.8rem;
  padding: 10px;
  position: relative;
  ${({ isActive }) =>
    isActive &&
    `
    border: 1px solid rgb(143, 86, 232);
    border-radius: 8px;
    `}
`;

export const StyledFormNavigation = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 10px;
`;
