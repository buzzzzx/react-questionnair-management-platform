import { Form, Input } from "antd";
import { LongButton } from "../../components/lib";

export const RegisterScreen = () => {
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
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder={"确认密码"} type="password" id="cpassword" />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType={"submit"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
