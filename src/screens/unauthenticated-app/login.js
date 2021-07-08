import { Form, Input } from "antd";
import { LongButton } from "../../components/lib";
import { useAuth } from "../../context/auth-context";
import { useAsync } from "../../utils/use-async";

export const LoginScreen = ({ onError }) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async ({ username, password }) => {
    try {
      await run(login({ username, password }));
    } catch (e) {
      onError(e);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id="username" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type="primary" htmlType={"submit"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
