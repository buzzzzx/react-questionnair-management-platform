import {
  Button,
  Descriptions,
  Divider,
  PageHeader,
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
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { EmptyQuestionnaires } from "./empty";

export const List = ({ list, loading }) => {
  // TODO 路由：创建，预览，统计分析，编辑，填写链接
  // TODO 答卷数量实时更新
  // TODO 批量删除

  // 删除
  const { mutate: deleteQuestionnaire } = useDeleteQuestionnaire(
    useQuestionnairesQueryKey()
  );

  // 发布（停止发布）
  const { mutateAsync: editRelease } = useEditReleaseQuestionnaire(
    useQuestionnairesQueryKey()
  );

  const navigate = useNavigate();

  return (
    <ListContainer>
      {loading ? (
        <Spin
          style={{
            margin: "70px",
          }}
          size={"small"}
        />
      ) : list.length === 0 ? (
        <EmptyQuestionnaires />
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
                      {
                        name: "编辑",
                        handler: () => {
                          status === 2
                            ? Modal.confirm({
                                title: "该问卷正在发布中，请先停止发布再编辑！",
                                okText: "确定",
                              })
                            : navigate(`${String(id)}/editing`);
                        },
                      },
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
                <div style={{ display: "flex" }}>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        width: "max-content",
                      }}
                    >
                      <Statistic
                        style={{
                          marginRight: 32,
                        }}
                        title="填写链接"
                        value={statusText}
                      />
                      <Statistic
                        title="答卷数量"
                        value={answerCount}
                        valueStyle={{ color: "#3f8600" }}
                        // prefix={<CheckCircleOutlined />}
                        style={{
                          marginRight: 32,
                        }}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      justifyContent: "flex-end",
                    }}
                  >
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
                        {openCode ? (
                          <a href={`/write/${openCode}`}>Click</a>
                        ) : (
                          "还没发布"
                        )}
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                </div>
                {/*<br />*/}
              </PageHeader>
              {index !== list.length - 1 ? <Divider dashed={true} /> : null}
            </>
          );
        })
      )}
      <Divider />
    </ListContainer>
  );
};

const ListContainer = styled.div`
  flex: 1;
  overflow-x: auto;
  //::-webkit-scrollbar {
  //  display: none;
  //}
`;

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
