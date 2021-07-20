import { useDeleteAnswer, usePinAnswer } from "../../utils/answer";
import { useAnswersQueryKey } from "./util";
import { Table, Tooltip, Pagination, Button, Modal, message } from "antd";
import { Pin } from "../../components/pin";
import dayjs from "dayjs";
import { DeleteOutlined, FileSearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

export const List = ({ questionnaireId, list, loading }) => {
  const answersQueryKey = useAnswersQueryKey(questionnaireId);
  const { mutate } = usePinAnswer(answersQueryKey);
  const pinAnswer = (answerId) => (pin) => {
    console.log("answerId pin", answerId, pin);
    mutate({ answerId, pin: pin === true ? 2 : 1 });
  };
  const { mutateAsync: deleteSingleAnswer } = useDeleteAnswer(answersQueryKey);
  const navigate = useNavigate();

  // TODO 点击查看 Link 到答卷查看页面

  return (
    <Table
      rowKey={"answerId"}
      pagination={{
        total: list?.length,
        defaultCurrent: 1,
        defaultPageSize: 5,
        // showQuickJumper: true,
        // showSizeChanger: true,
      }}
      columns={[
        {
          title: (
            <Pin checked={true} onCheckedChange={undefined} disabled={true} />
          ),
          render(value, answer) {
            return (
              <Pin
                checked={answer.pin === 2}
                onCheckedChange={pinAnswer(answer.answerId)}
              />
            );
          },
        },
        {
          title: "序号",
          render(value, answer) {
            return list.findIndex((as) => as === answer) + 1;
          },
        },
        {
          title: "提交答卷时间",
          sorter: (a, b) => a.answerTime - b.answerTime,
          render(value, answer) {
            return (
              <span>
                {dayjs(answer.answerTime).format("YYYY-MM-DD hh:mm:ss")}
              </span>
            );
          },
        },
        {
          title: (
            <Tooltip placement={"topRight"} title={"答卷时的 IP 地址"}>
              来自 IP
            </Tooltip>
          ),
          render(value, answer) {
            return (
              // <Tooltip placement="bottomRight" title={answer.ip}>
              <span>{answer.ip}</span>
              // </Tooltip>
            );
          },
        },
        {
          title: "操作区域",
          render(value, answer) {
            return (
              <>
                <Tooltip title={"查看答卷内容"}>
                  <Button
                    icon={<FileSearchOutlined />}
                    type={"link"}
                    onClick={() => {
                      navigate(`${String(answer.answerId)}`);
                    }}
                  />
                </Tooltip>
                <Tooltip title={"删除"}>
                  <Button
                    icon={<DeleteOutlined />}
                    type={"link"}
                    onClick={() => {
                      Modal.confirm({
                        title: `确定删除该张答卷吗？`,
                        content: "点击确定删除",
                        okText: "确定",
                        cancelText: "取消",
                        onOk() {
                          deleteSingleAnswer(answer.answerId)
                            .then(() => {
                              message.success(`删除答卷成功`);
                            })
                            .catch((e) => {
                              message.error(`删除答卷失败`);
                            });
                        },
                      });
                    }}
                  />
                </Tooltip>
              </>
            );
          },
        },
      ]}
      loading={loading}
      dataSource={list}
    />
  );
};
