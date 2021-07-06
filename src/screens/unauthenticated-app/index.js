import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import left from "../../assets/left.svg";
import right from "../../assets/right.svg";
import styled from "@emotion/styled";
import { Button, Card, Divider } from "antd";
import { ErrorBox, Row } from "../../components/lib";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router, Link } from "react-router-dom";

export const UnauthenticatedApp = () => {
  // TODO 标题 helmet
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Container>
      <Router>
        <Header>
          <Logo width={"7rem"} />
          <div>欢迎来到问卷管理平台👏</div>
        </Header>
        <Background />
        <ShadowCard>
          <Title>{isRegister ? "请注册" : "请登录"}</Title>
          <ErrorBox error={error} />
          <Routes>
            <Route
              path={"/login"}
              element={<LoginScreen onError={setError} />}
            />
            <Route
              path={"/register"}
              element={<RegisterScreen onError={setError} />}
            />
            <Navigate to={"/login"} />
          </Routes>
          <Divider />
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Button type={"link"} onClick={() => setIsRegister(!isRegister)}>
            <Link to={isRegister ? "/login" : "/register"}>
              {isRegister ? "已经有帐号了？直接登录" : "没有帐号？注册新帐号"}
            </Link>
          </Button>
        </ShadowCard>
      </Router>
    </Container>
  );
};

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const Header = styled(Row)`
  padding: 3rem 0;
  font-size: 2rem;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  text-align: center;
`;
