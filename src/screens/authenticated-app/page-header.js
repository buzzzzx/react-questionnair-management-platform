import styled from "@emotion/styled";
import { Row } from "../../components/lib";
import { User } from "./user";
import { QuestionnairesPopover } from "./questionnaires-popover";
import { resetRoute } from "../../utils";
import { Logo } from "../../components/logo";

export const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <LogoAndTitle onClick={resetRoute}>
          <Logo />
          <h4 style={{ fontWeight: "bolder" }}>问卷喵</h4>
        </LogoAndTitle>
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

const LogoAndTitle = styled(Row)`
  font-size: 2rem;
  cursor: pointer;
`;

const HeaderRight = styled.div``;
