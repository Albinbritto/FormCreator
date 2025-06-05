import styled from "styled-components";
import { Layout, Button, List } from "antd";

const { Header, Sider, Content } = Layout;

export const StyledLayout = styled(Layout)`
  height: 100%;
  font-family: inherit;
`;

export const StyledHeader = styled(Header)`
  padding: 0 24px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
`;

export const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LogoText = styled.span`
  font-size: 1.125rem;
  font-weight: 600;
`;

export const StyledSider = styled(Sider)`
  background: #fff;
  border-right: 1px solid #f0f0f0;
  padding: 16px;
  font-family: inherit;
  & .ant-menu-item-selected {
    background: #f1f3f9;
    color: #000;
    border: 1px solid #dde1e9;
  }
`;

export const CreateFormButton = styled(Button)`
  background: #722ed1;
  margin-bottom: 16px;
  height: 45px;
  &:hover {
    background: #531dab !important;
  }
`;

export const ContentWrapper = styled(Content)`
  padding: 24px;
  background: #f1f3f9;
`;

export const ContentCard = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 8px;
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  align-items: center;
`;

export const FormListItem = styled(List.Item)`
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  margin-bottom: 8px;
`;

export const ModalListItem = styled(List.Item)`
  cursor: pointer;
  padding: 16px;
  border-radius: 8px;

  &:hover {
    background: #f5f5f5;
  }
`;
