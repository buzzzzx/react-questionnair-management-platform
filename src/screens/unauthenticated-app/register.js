import { Form, Input } from "antd";
import { LongButton } from "../../components/lib";
import { useAuth } from "../../context/auth-context";
import { useAsync } from "../../utils/use-async";

export const RegisterScreen = ({ onError }) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async ({ username, password, cpassword }) => {
    if (password !== cpassword) {
      onError(new Error("请确认两次输入密码相同"));
      return;
    }

    try {
      await run(register({ username, password }));
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
        <Input
          onChange={() => onError(null)}
          placeholder={"用户名"}
          type="text"
          id="username"
        />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id="password" />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder={"确认密码"} type="password" id="cpassword" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type="primary" htmlType={"submit"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
