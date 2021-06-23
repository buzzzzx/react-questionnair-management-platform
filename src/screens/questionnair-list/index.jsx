// TODO 可以使用 AntDesign 的 PageHeader 来做每个 questionnaire 的展示
import { PageHeader, Button, Descriptions, Tag, Row, Statistic } from "antd";

export const QuestionnaireListScreen = () => {
  return (
    <>
      <PageHeader
        style={{ border: "1px solid rgb(235, 237, 240)" }}
        onBack={() => window.history.back()}
        title="Title"
        subTitle="This is a subtitle"
        extra={[
          <Button key="3">Operation</Button>,
          <Button key="2">Operation</Button>,
          <Button key="1" type="primary">
            Primary
          </Button>,
        ]}
      >
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="Created">Lili Qu</Descriptions.Item>
          <Descriptions.Item label="Association">
            <a>421421</a>
          </Descriptions.Item>
          <Descriptions.Item label="Creation Time">
            2017-01-10
          </Descriptions.Item>
          <Descriptions.Item label="Effective Time">
            2017-10-10
          </Descriptions.Item>
          <Descriptions.Item label="Remarks">
            Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <br />
      <PageHeader
        onBack={() => window.history.back()}
        title="Title"
        tags={<Tag color="blue">Running</Tag>}
        subTitle="This is a subtitle"
        extra={[
          <Button key="3">Operation</Button>,
          <Button key="2">Operation</Button>,
          <Button key="1" type="primary">
            Primary
          </Button>,
        ]}
      >
        <Row>
          <Statistic title="Status" value="Pending" />
          <Statistic
            title="Price"
            prefix="$"
            value={568.08}
            style={{
              margin: "0 32px",
            }}
          />
          <Statistic title="Balance" prefix="$" value={3345.08} />
        </Row>
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
