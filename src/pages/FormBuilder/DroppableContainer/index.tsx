import { useDroppable } from "@dnd-kit/core";
import { StyledFormPage } from "../index.style";

export function DroppableContainer({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      dndType: "container",
    },
  });

  return <StyledFormPage ref={setNodeRef}>{children}</StyledFormPage>;
}
