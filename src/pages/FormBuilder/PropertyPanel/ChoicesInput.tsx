import { Button, Input, List, Modal } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

interface ChoicesInputProps {
  value: { label: string; value: string }[];
  onChange: (value: { label: string; value: string }[]) => void;
}

export const ChoicesInput: React.FC<ChoicesInputProps> = ({
  value: options,
  onChange: onSave,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [choices, setChoices] = useState(options);

  useEffect(() => {
    setChoices(options);
  }, [options]);

  const handleAddChoice = () => {
    setChoices([...choices, { label: "", value: "" }]);
  };

  const handleEditChoice = (
    index: number,
    updatedChoice: { label: string; value: string }
  ) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = updatedChoice;
    setChoices(updatedChoices);
  };

  const handleDeleteChoice = (index: number) => {
    const updatedChoices = choices.filter((_, i) => i !== index);
    setChoices(updatedChoices);
  };

  const handleSave = () => {
    const filterValidChoices = choices.filter(
      ({ label, value }) => label.trim() && value.trim()
    );
    setChoices(filterValidChoices);
    onSave(filterValidChoices);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="link"
        style={{
          color: "rgb(143, 86, 232)",
          width: "max-content",
          padding: "0",
          fontWeight: "500",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        Edit/Add Choices
      </Button>

      <Modal
        title="Edit/Add Choices"
        open={isModalOpen}
        destroyOnClose={true}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
      >
        <List
          dataSource={choices}
          bordered={false}
          renderItem={(choice, index) => (
            <List.Item
              style={{ gap: "20px", borderBottom: "none" }}
              actions={[
                <AiOutlineDelete
                  color="red"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteChoice(index)}
                />,
              ]}
            >
              <Input
                placeholder="Label"
                value={choice.label}
                onChange={(e) =>
                  handleEditChoice(index, { ...choice, label: e.target.value })
                }
                style={{ marginRight: "8px" }}
              />
              <Input
                placeholder="Value"
                value={choice.value}
                onChange={(e) =>
                  handleEditChoice(index, { ...choice, value: e.target.value })
                }
              />
            </List.Item>
          )}
        />
        <div style={{ marginTop: "16px" }}>
          <Button type="primary" onClick={handleAddChoice}>
            Add Choice
          </Button>
        </div>
      </Modal>
    </>
  );
};
