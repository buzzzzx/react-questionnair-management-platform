import styled from "@emotion/styled";
import { PageHeader } from "./page-header";
import { QuestionnaireListScreen } from "../questionnair-list";
import { Navigate, Route, Routes } from "react-router";
import { Questionnaire } from "../questionnaire";
import { Helmet } from "react-helmet";
import { QuestionnairePreview } from "../questionnaire-preview";
import { QuestionnaireAnalysis } from "../questionnaire-analysis";
import { QuestionnaireFill } from "../questionnaire-fill";
import { QuestionnaireAnswer } from "../questionnaire-answer";
import React from "react";
import { QuestionnaireAnswerList } from "../questionnaire-answer-list";

export const AuthenticatedApp = () => {
  // 路由：创建问卷，编辑问卷，预览，统计分析，所有答卷
  // TODO 其他模块页面的 title

  return (
    <Container>
      <Helmet>
        <title>我的问卷</title>
      </Helmet>
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
            element={<QuestionnairePreview />}
          />
          <Route
            path={"/questionnaires/:id/analysis"}
            element={<QuestionnaireAnalysis />}
          />
          <Route
            path={"/questionnaires/:id/answers"}
            element={<QuestionnaireAnswerList />}
          />
          <Route path={"/fill/*"} element={<QuestionnaireFill />} />
          <Route
            path={"/questionnaires/:id/answers/:id"}
            element={<QuestionnaireAnswer />}
          />
          <Navigate to={"/questionnaires"} />
        </Routes>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
  //height: auto;
`;

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;
