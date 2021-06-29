import {
  Button,
  Descriptions,
  Divider,
  PageHeader,
  Row,
  Statistic,
  Tag,
  Modal,
} from "antd";
import { More } from "./more";
import dayjs from "dayjs";

export const List = ({ list }) => {
  const deleteQuestionnaire = () => {};
  return (
    <>
      {list.map((questionnaire, index) => {
        const {
          title,
          subTitle,
          status,
          answerCount,
          createTime,
          endTime,
          answerLink,
        } = questionnaire;

        let tagColor, statusText, buttonText;
        if (status === 0) {
          tagColor = "blue";
          statusText = "未发布";
          buttonText = "发布";
        } else if (status === 1) {
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
              subTitle={subTitle}
              extra={[
                <More
                  key={"3"}
                  questionnaire={questionnaire}
                  name={"查看问卷"}
                  operations={[
                    { name: "预览", handler: () => {} },
                    { name: "统计分析", handler: () => {} },
                  ]}
                />,
                <More
                  key={"2"}
                  questionnaire={questionnaire}
                  name={"编辑问卷"}
                  operations={[
                    { name: "编辑", handler: () => {} },
                    {
                      name: "删除",
                      handler: (id) => {
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
                <Button key="1" type="primary">
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
                <Descriptions.Item label="创建时间">
                  {/*2021-06-23*/}
                  {dayjs(createTime).format("YYYY-MM-DD")}
                </Descriptions.Item>
                <Descriptions.Item label="截止时间">
                  {/*2021-06-24*/}
                  {dayjs(endTime).format("YYYY-MM-DD")}
                </Descriptions.Item>
                <Descriptions.Item label="填写链接">
                  {answerLink}
                </Descriptions.Item>
              </Descriptions>
              >
            </PageHeader>
            {index === list.length - 1 ? <Divider /> : null}
          </>
        );
      })}

      <PageHeader
        title="XXX产品用户调研"
        tags={<Tag color="blue">未发布</Tag>}
        subTitle=""
        extra={[
          <More
            key={"3"}
            questionnaire={undefined}
            operations={"查看问卷"}
            operation1={"预览"}
            operation2={"统计分析"}
          />,
          <More
            key={"2"}
            questionnaire={undefined}
            operations={"编辑问卷"}
            operation1={"编辑"}
            operation2={"删除"}
          />,
          <Button key="1" type="primary">
            发布
          </Button>,
        ]}
      >
        <Row>
          <Statistic title="发布状态" value="未发布" />
          <Statistic
            title="答卷数量"
            // prefix="$"
            value={0}
            style={{
              margin: "0 32px",
            }}
          />
          {/*<Statistic title="Balance" prefix="$" value={3345.08} />*/}
        </Row>
        <br />
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="创建时间">2021-06-23</Descriptions.Item>
          <Descriptions.Item label="截止时间">2021-06-24</Descriptions.Item>
          <Descriptions.Item label="填写链接"></Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Divider />
      <PageHeader
        title="上课签到"
        tags={<Tag color="green">已发布</Tag>}
        subTitle="量子计算的哲学与逻辑课程签到问卷"
        extra={[
          <More
            key={"3"}
            questionnaire={undefined}
            operations={"查看问卷"}
            operation1={"预览"}
            operation2={"统计分析"}
          />,
          <More
            key={"2"}
            questionnaire={undefined}
            operations={"编辑问卷"}
            operation1={"编辑"}
            operation2={"删除"}
          />,
          <Button key="1" type="primary">
            停止发布
          </Button>,
        ]}
      >
        <Row>
          <Statistic title="发布状态" value="已发布" />
          <Statistic
            title="答卷数量"
            // prefix="$"
            value={77}
            style={{
              margin: "0 32px",
            }}
          />
          {/*<Statistic title="Balance" prefix="$" value={3345.08} />*/}
        </Row>
        <br />
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="创建时间">2021-06-23</Descriptions.Item>
          <Descriptions.Item label="截止时间">2021-06-24</Descriptions.Item>
          <Descriptions.Item label="填写链接">xxxx</Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </>
  );
};

/**
 * questionnaire list 返回 [] 的元素需要的字段
 * id
 * title
 * subTitle
 * status: 0-未发布；1-发布中；2-已结束
 * answerCount: 答卷数量
 * createTime: 创建时间，时间戳
 * endTime: 截止时间，时间戳
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
