import { Form, Input } from "antd";
import { LongButton } from "../../components/lib";
export const LoginScreen = () => {
  const handleSubmit = () => {};
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
        <LongButton type="primary" htmlType={"submit"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
