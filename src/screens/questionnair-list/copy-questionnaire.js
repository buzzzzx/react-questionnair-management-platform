import { Form, Input, message } from "antd";

export const CopyQuestionnaire = ({ questionnaire, copyQuestionnaire }) => {
  // 复制时可填写标题，说明，也可以不填，不填则使用原问卷的该数据，使用一个 modal
  // 问卷的内容，除了 id（后端创建），发布时间（null），创建时间（后端创建），上次编辑时间（后端创建），截止时间（null），状态（1：未发布），答卷数量（0）
  //    其余保持一致
  // 使用创建问卷接口

  const handleSubmit = ({ title, description }) => {
    let newTitle, newDescription;
    newTitle = title;
    newDescription = description;
    if (title === undefined) {
      newTitle = questionnaire.title;
    }

    if (description === undefined) {
      newDescription = questionnaire.description;
    }

    const copy = {
      title: newTitle,
      description: newDescription,
      questions: questionnaire.questions,
      status: 1,
      answerCount: 0,
    };
    copyQuestionnaire(copy)
      .then((res) => {
        message.success("问卷复制成功");
      })
      .catch((e) => {
        message.error("问卷复制失败");
      });
  };

  return (
    <Form
      id={"copyForm"}
      onFinish={handleSubmit}
      preserve={false}
      style={{ marginTop: "3rem" }}
    >
      <Form.Item
        name={"title"}
        label={"问卷标题"}
        rules={[{ pattern: /^[^\s]*$/, message: "问卷标题不能有空格" }]}
      >
        <Input placeholder={"不填则使用原问卷标题"} type="text" id="title" />
      </Form.Item>
      <Form.Item
        name={"description"}
        label={"问卷描述"}
        rules={[{ pattern: /^[^\s].*$/, message: "问卷描述不能以空格开头" }]}
      >
        <Input
          placeholder={"不填则使用原问卷描述"}
          type="text"
          id="description"
        />
      </Form.Item>
    </Form>
  );
};
