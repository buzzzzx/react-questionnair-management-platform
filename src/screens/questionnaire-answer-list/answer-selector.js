import { Form, Select } from "antd";

export const AnswerSelector = ({ param, setParam }) => {
  return (
    <Form css={{ marginBottom: "4rem" }} layout={"inline"}>
      <Form.Item>
        <Select
          value={param.pin ? Number(param.pin) : 0}
          onChange={(value) =>
            setParam({
              ...param,
              pin: Number(value) || undefined,
            })
          }
        >
          <Select.Option value={0}>所有答卷</Select.Option>
          <Select.Option value={1}>未收藏答卷</Select.Option>
          <Select.Option value={2}>收藏答卷</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};
