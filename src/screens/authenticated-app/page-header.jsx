import styled from "@emotion/styled";
import { Row } from "../../components/lib";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Button } from "antd";
import { User } from "./user";
import { QuestionnairesPopover } from "./questionnaires-popover";

export const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button>
          <Logo width={"18rem"} />
        </Button>
        <QuestionnairesPopover />
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;
