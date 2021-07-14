import { Form, Input, Select } from "antd";

export const SearchPanel = ({ params, setParams }) => {
  // TODO 已结束
  return (
    <Form css={{ marginBottom: "4rem" }} layout={"inline"}>
      <Form.Item>
        <Select
          value={params.status ? Number(params.status) : 0}
          onChange={(value) =>
            setParams({
              ...params,
              status: Number(value) || undefined,
            })
          }
        >
          <Select.Option value={0}>问卷状态</Select.Option>
          <Select.Option value={1}>未发布</Select.Option>
          <Select.Option value={2}>发布中</Select.Option>
          <Select.Option value={3}>已结束</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Input
          type="text"
          placeholder={"输入问卷名称"}
          value={params.name}
          onChange={(evt) => setParams({ ...params, name: evt.target.value })}
        />
      </Form.Item>
    </Form>
  );
};
