import {
  Button,
  Descriptions,
  Divider,
  PageHeader,
  Row,
  Statistic,
  Tag,
} from "antd";

export const List = () => {
  return (
    <>
      <PageHeader
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

      <Divider />

      <PageHeader
        title="上课签到"
        tags={<Tag color="blue">Running</Tag>}
        subTitle="量子计算的哲学与逻辑课程签到问卷"
        extra={[
          <Button key="3">查看问卷</Button>,
          <Button key="2">编辑问卷</Button>,
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
          <Statistic title="Balance" prefix="$" value={3345.08} />
        </Row>
        <br />
        <Descriptions size="small" column={3}>
          <Descriptions.Item label="创建时间">2021-06-23</Descriptions.Item>
          <Descriptions.Item label="截止时间">2021-06-24</Descriptions.Item>
          <Descriptions.Item label="Remarks">
            Gonghu Road, Xihu District, Hangzhou, Zhejiang, China
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    </>
  );
};
