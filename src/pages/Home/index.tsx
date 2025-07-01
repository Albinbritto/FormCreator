import React, { useState } from "react";
import { Menu, Button, Modal, List, Avatar, Space } from "antd";
import {
  FormOutlined,
  DeleteOutlined,
  SearchOutlined,
  FilterOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  StarOutlined,
  RobotOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Checkbox from "antd/es/checkbox/Checkbox";
import { AiOutlineFileText } from "react-icons/ai";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import {
  StyledLayout,
  StyledHeader,
  HeaderLogo,
  LogoText,
  StyledSider,
  CreateFormButton,
  ContentWrapper,
  ContentCard,
  ContentHeader,
  FormListItem,
  ModalListItem,
} from "./Home.styles";
import Form from "../../components/Form";
import Input from "../../components/inputs_v1/input";

const mockForms = [
  { id: "1", name: "Untitled form", responses: 0, lastEdit: "5/28/2025" },
];

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleCreateFormClick = (type: string) => {
    setModalVisible(false);
    navigate("/form-builder");
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <StyledLayout>
      <StyledHeader>
        <HeaderLogo>
          <LogoText>FormCreator.ai</LogoText>
        </HeaderLogo>
        <Space>
          <Avatar style={{ background: "#7F7EF0" }}>A</Avatar>
        </Space>
      </StyledHeader>

      <StyledLayout>
        <StyledSider width={250} collapsed={collapsed} trigger={null}>
          <CreateFormButton
            type="primary"
            block
            size="large"
            onClick={() => setModalVisible(true)}
          >
            {!collapsed ? "Create a new form" : "+"}
          </CreateFormButton>

          <Menu
            mode="inline"
            defaultSelectedKeys={["forms"]}
            style={{ border: "none" }}
            items={[
              {
                key: "forms",
                icon: <AiOutlineFileText />,
                label: "My Forms",
              },
              {
                key: "trash",
                icon: <DeleteOutlined />,
                label: "Trash",
              },
            ]}
          />

          <Button
            type="text"
            onClick={toggleCollapsed}
            style={{
              position: "absolute",
              bottom: "20px",
              left: collapsed ? "24px" : "200px",
            }}
          >
            {collapsed ? <FaAngleRight /> : <FaAngleLeft />}
          </Button>
        </StyledSider>

        <ContentWrapper>
          <ContentCard>
            <ContentHeader>
              <h2 style={{ margin: 0 }}>My Forms</h2>
              <Space>
                <Button icon={<SearchOutlined />} />
                <Button icon={<FilterOutlined />} />
                <Space.Compact>
                  <Button icon={<UnorderedListOutlined />} />
                  <Button icon={<AppstoreOutlined />} />
                </Space.Compact>
              </Space>
            </ContentHeader>

            <List
              dataSource={mockForms}
              renderItem={(item) => (
                <FormListItem>
                  <List.Item.Meta
                    avatar={<Checkbox />}
                    title={
                      <Space>
                        <StarOutlined style={{ color: "#d9d9d9" }} />
                        {item.name}
                      </Space>
                    }
                  />
                  <Space size="large">
                    <span>Responses: {item.responses}</span>
                    <span>{item.lastEdit}</span>
                    <Button type="text" icon={<SearchOutlined />} />
                  </Space>
                </FormListItem>
              )}
            />
          </ContentCard>
        </ContentWrapper>
      </StyledLayout>

      <Modal
        title="Create New Form"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={400}
      >
        <List
          dataSource={[
            {
              key: "scratch",
              title: "Create form from scratch",
              icon: <FormOutlined />,
            },
            {
              key: "ai",
              title: "Create using AI",
              icon: <RobotOutlined />,
            },
            {
              key: "template",
              title: "Create from template",
              icon: <CopyOutlined />,
            },
          ]}
          renderItem={(item) => (
            <ModalListItem onClick={() => handleCreateFormClick(item.key)}>
              <List.Item.Meta
                avatar={React.cloneElement(item.icon, {
                  style: { fontSize: "24px", color: "#14124F" },
                })}
                title={item.title}
              />
            </ModalListItem>
          )}
        />
      </Modal>
    </StyledLayout>
  );
};

export default Home;
