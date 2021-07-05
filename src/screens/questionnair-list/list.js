import {
  Button,
  Descriptions,
  Divider,
  PageHeader,
  Row,
  Statistic,
  Tag,
  Modal,
  Spin,
} from "antd";
import { More } from "./more";
import dayjs from "dayjs";
import {
  useDeleteQuestionnaire,
  useEditReleaseQuestionnaire,
} from "../../utils/questionnaire";
import { useQuestionnairesQueryKey } from "./util";
import { Link } from "react-router-dom";

export const List = ({ list, loading }) => {
  // TODO 路由：创建，预览，统计分析，编辑
  // TODO 列表滑动 bug，
  // TODO 还没有问卷 优化样式
  // TODO 编辑问卷时状态为发布中则弹出窗口提示停止发布
  // TODO 填写链接
  // TODO 答卷数量实时更新
  // TODO 批量删除

  // 删除
  const { mutate: deleteQuestionnaire } = useDeleteQuestionnaire(
    useQuestionnairesQueryKey()
  );

  // 发布（停止发布）
  const {
    mutateAsync: editRelease,
    error,
    isLoading: editLoading,
  } = useEditReleaseQuestionnaire(useQuestionnairesQueryKey());

  return (
    <>
      {loading ? (
        <Spin size={"large"} />
      ) : list.length === 0 ? (
        <div>还没有问卷，赶快去创建</div>
      ) : (
        list.map((questionnaire, index) => {
          const {
            id,
            title,
            description,
            status,
            answerCount,
            lastEditedTime,
            releaseTime,
            openCode,
          } = questionnaire;

          let tagColor, statusText, buttonText;
          if (status === 1) {
            tagColor = "blue";
            statusText = "未发布";
            buttonText = "发布";
          } else if (status === 2) {
            tagColor = "green";
            statusText = "发布中";
            buttonText = "停止发布";
          } else {
            tagColor = "yellow";
            statusText = "已结束";
            buttonText = "发布"; // 还需要设置截止时间
          }

          return (
            <>
              <PageHeader
                key={index}
                title={title}
                tags={<Tag color={tagColor}>{statusText}</Tag>}
                subTitle={description || ""}
                extra={[
                  <More
                    key={"3"}
                    name={"查看问卷"}
                    operations={[
                      <Link to={`${String(id)}/preview`}>预览</Link>,
                      <Link to={`${String(id)}/analysis`}>统计分析</Link>,
                    ]}
                  />,
                  <More
                    key={"2"}
                    name={"编辑问卷"}
                    operations={[
                      <Link to={`${String(id)}/editing`}>编辑</Link>,
                      {
                        name: "删除",
                        handler: () => {
                          Modal.confirm({
                            title: "确定删除这个问卷吗？",
                            content: "点击确定删除",
                            okText: "确定",
                            onOk() {
                              deleteQuestionnaire({ id });
                            },
                          });
                        },
                      },
                    ]}
                  />,
                  <Button
                    key="1"
                    type="primary"
                    onClick={() => {
                      // TODO 结束状态
                      editRelease({
                        id: questionnaire.id,
                        status: status === 1 ? 2 : 1,
                      });
                    }}
                  >
                    {buttonText}
                  </Button>,
                ]}
              >
                <Row>
                  <Statistic title="发布状态" value={statusText} />
                  <Statistic
                    title="答卷数量"
                    // prefix="$"
                    value={answerCount}
                    style={{
                      margin: "0 32px",
                    }}
                  />
                  {/*<Statistic title="Balance" prefix="$" value={3345.08} />*/}
                </Row>
                <br />
                <Descriptions size="small" column={3}>
                  <Descriptions.Item label="上次编辑时间">
                    {dayjs(lastEditedTime).format("YYYY-MM-DD hh:mm:ss")}
                  </Descriptions.Item>
                  <Descriptions.Item label="发布时间">
                    {releaseTime
                      ? dayjs(releaseTime).format("YYYY-MM-DD hh:mm:ss")
                      : "还没发布"}
                  </Descriptions.Item>
                  <Descriptions.Item label="填写链接">
                    {openCode ?? "还没发布"}
                  </Descriptions.Item>
                </Descriptions>
              </PageHeader>
              {index !== list.length - 1 ? <Divider /> : null}
            </>
          );
        })
      )}
    </>
  );
};

/**
 * questionnaire list 返回 [] 的元素需要的字段
 * id
 * title
 * description
 * status: 1-未发布；2-发布中；3-已结束
 * answerCount: 答卷数量
 * createTime: 创建时间，时间戳
 * releaseTime: 发布时间
 * answerLink: 填写链接
 */

// const IconLink = ({ src, text }) => (
//   <a className="example-link">
//     <img className="example-link-icon" src={src} alt={text} />
//     {text}
//   </a>
// );

//<div>
//  <IconLink
//    src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
//    text="Quick Start"
//  />
//  <IconLink
//    src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
//    text=" Product Info"
//  />
//  <IconLink
//    src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
//    text="Product Doc"
//  />
//</div>
