import styled from "@emotion/styled";
import { PageHeader } from "./page-header";
import { QuestionnaireListScreen } from "../questionnair-list";

export const AuthenticatedApp = () => {
  // TODO 标题

  // TODO 路由

  return (
    <Container>
      <PageHeader />
      <Main>
        <QuestionnaireListScreen />
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;
