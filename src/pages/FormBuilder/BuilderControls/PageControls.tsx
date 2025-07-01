import React from "react";
import { BuilderControls } from ".";
import { Page } from "../../../models/Form";
import { useFormBuilderStore } from "../../../store/FormBuilderStore";

export const PageControls: React.FC<{ page: Page }> = React.memo(({ page }) => {
  const { removePage } = useFormBuilderStore();
  return (
    <BuilderControls
      className="page-controls"
      type="page"
      onClick={() => {
        removePage(page.pageId);
      }}
    />
  );
});
