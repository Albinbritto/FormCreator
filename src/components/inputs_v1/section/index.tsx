import styled from "styled-components";

export const StyledFormSection = styled.h4`
  font-weight: 500;
  color: #3f3d3d;
  background: #f8f7f7;
  margin: 0;
`;

const Section = (props: { label: string }) => {
  const { label } = props;
  return <StyledFormSection>{label}</StyledFormSection>;
};

export default Section;
