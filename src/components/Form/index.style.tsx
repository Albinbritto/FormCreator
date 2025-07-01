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

export const StyledFormNavigation = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 10px;
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
