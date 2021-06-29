import styled from "@emotion/styled";
import { Row } from "../../components/lib";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { User } from "./user";
import { QuestionnairesPopover } from "./questionnaires-popover";

export const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <LogoTitle>
          <Logo width={"7rem"} />
          <h4 style={{ fontWeight: "bolder" }}>问卷管理平台</h4>
        </LogoTitle>
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
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;

const LogoTitle = styled(Row)`
  font-size: 2rem;
`;

const HeaderRight = styled.div``;