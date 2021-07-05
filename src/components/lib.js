import styled from "@emotion/styled";
import { Button, Spin, Typography } from "antd";

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottom + "rem"};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

export const LongButton = styled(Button)`
  width: 100%;
`;

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;

export const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const isError = (value) => {
  return Object.prototype.toString.call(value) === "[object Error]";
};

export const ErrorBox = ({ error }) => {
  if (isError(error)) {
    return <Typography.Text type={"danger"}> {error?.message}</Typography.Text>;
  }
  return null;
};

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FullPageLoading = () => (
  <FullPage>
    <Spin size={"large"} />
  </FullPage>
);

export const FullPageErrorFallback = ({ error }) => (
  <FullPage>
    <ErrorBox error={error} />
  </FullPage>
);
