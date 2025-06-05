import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const PreviewButton = () => {
  const navigate = useNavigate();

  return (
    <AiOutlineEye
      color="gray"
      onClick={() => navigate("/form-preview")}
      style={{ cursor: "pointer" }}
    />
  );
};

export default PreviewButton;
