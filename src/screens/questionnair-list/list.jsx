import {
  Button,
  Descriptions,
  Divider,
  PageHeader,
  Row,
  Statistic,
  Tag,
} from "antd";
import { More } from "./more";

export const List = () => {
  return (
    <>
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
