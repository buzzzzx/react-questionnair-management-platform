import styled from "@emotion/styled";
import { PageHeader } from "./page-header";
import { QuestionnaireListScreen } from "../questionnair-list";
import { Navigate, Route, Routes } from "react-router";
import { Questionnaire } from "../questionnaire";

export const AuthenticatedApp = () => {
  // TODO 标题

  // TODO 路由：创建问卷，编辑问卷，预览，统计分析

  return (
    <Container>
      <PageHeader />
      <Main>
        <Routes>
          <Route
            path={"/questionnaires"}
            element={<QuestionnaireListScreen />}
          />
          <Route path={"/questionnaires/create"} element={<Questionnaire />} />
          <Route
            path={"/questionnaires/:id/editing"}
            element={<Questionnaire />}
          />
          <Route
            path={"/questionnaires/:id/preview"}
            element={<Questionnaire />}
          />
          <Route
            path={"/questionnaires/:id/analysis"}
            element={<Questionnaire />}
          />
          <Route path={"/write/*"} element={<Questionnaire />} />
          <Navigate to={"/questionnaires"} />
        </Routes>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  //height: 100vh;
  height: auto;
`;

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;
