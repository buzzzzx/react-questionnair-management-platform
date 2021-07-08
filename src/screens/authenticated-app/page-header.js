import styled from "@emotion/styled";
import { Row } from "../../components/lib";
import { ReactComponent as Logo } from "../../assets/bluecat.svg";
import { User } from "./user";
import { QuestionnairesPopover } from "./questionnaires-popover";
import { resetRoute } from "../../utils";

export const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <LogoTitle onClick={resetRoute}>
          <Logo height={"6rem"} width={"6rem"} />
          <h4 style={{ fontWeight: "bolder" }}>问卷喵</h4>
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
  cursor: pointer;
`;

const HeaderRight = styled.div``;
