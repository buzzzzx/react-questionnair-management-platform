import { Form, Input, Select } from "antd";

export const SearchPanel = ({ params, setParams }) => {
  // TODO 排序和状态筛选

  return (
    <Form css={{ marginBottom: "4rem" }} layout={"inline"}>
      <Form.Item>
        <Select value={0}>
          <Select.Option value={0}>时间排序</Select.Option>
          <Select.Option value={1}>正序</Select.Option>
          <Select.Option value={2}>倒序</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Select value={0}>
          <Select.Option value={0}>问卷状态</Select.Option>
          <Select.Option value={1}>未发布</Select.Option>
          <Select.Option value={2}>已发布</Select.Option>
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
