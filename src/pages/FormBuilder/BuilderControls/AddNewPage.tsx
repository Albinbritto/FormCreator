import { Divider } from "antd";
import { StyledAddPageLabel } from "../index.style";
import { Page } from "../../../models/Form";
import { AiFillPlusCircle } from "react-icons/ai";
import { useFormBuilderStore } from "../../../store/FormBuilderStore";

export const AddNewPage = ({ index }: { index: number }) => {
  const { addPage } = useFormBuilderStore();
  return (
    <Divider variant="dashed">
      <StyledAddPageLabel
        onClick={() => {
          addPage(
            new Page({
              prevLabel: "prev",
              nextLabel: "next",
              pageName: "Untitled Page",
            }),
            index + 1
          );
        }}
      >
        <AiFillPlusCircle />
        Add Page
      </StyledAddPageLabel>
    </Divider>
  );
};
