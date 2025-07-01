import { Button } from "antd";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const PreviewButton = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/form-preview");
  }, [navigate]);

  return (
    <Button type="default" aria-label="Preview Form" onClick={handleClick}>
      Preview
    </Button>
  );
};

export default PreviewButton;
