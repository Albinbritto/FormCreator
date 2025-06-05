import { AiFillPlusCircle } from "react-icons/ai";

import { StyledAddNewPage, StyledAddPageLabel } from "../index.style";

const AddNewPage: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <StyledAddNewPage>
      <StyledAddPageLabel onClick={onClick}>
        <AiFillPlusCircle />
        Add Page
      </StyledAddPageLabel>
    </StyledAddNewPage>
  );
};

export default AddNewPage;
