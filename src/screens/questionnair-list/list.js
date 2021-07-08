import {
  Button,
  Descriptions,
  PageHeader,
  Statistic,
  Tag,
  Modal,
  Checkbox,
  Tooltip,
  message,
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
import { ButtonNoPadding } from "../../components/lib";
import {
  FolderViewOutlined,
  PieChartOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { PageHeaderSkeletons } from "./pageheader-skeleton";
import copy from "copy-to-clipboard";

const apiUrl = "http://121.36.47.113:3000";

export const List = ({ list, loading, deletes, setDeletes }) => {
  // 路由：创建，预览，统计分析，编辑，填写链接
  // Skeleton
  // 提示 message：删除，发布/停止发布，复制链接
  // 填写链接：点击 copy

  // TODO 答卷数量实时更新
  // TODO 怎么在 loading 的时候 获取 skeletons 的数量

  // handle checkbox
  const checkBoxHandler = (e, id) => {
    if (e.target.checked) {
      setDeletes([...deletes, id]);
    } else {
      const filtered = deletes.filter((quesId) => quesId !== id);
      setDeletes(filtered);
    }
  };

  // 点击填写链接 copy to clipboard
  const copyHandler = (e, openCode) => {
    const copyLink = `${apiUrl}/write/${openCode}`;
    if (copy(copyLink)) {
      message.success("复制成功 🙌");
    } else {
      message.error("复制失败");
    }
  };

  // 删除
  const { mutateAsync: deleteQuestionnaire } = useDeleteQuestionnaire(
    useQuestionnairesQueryKey()
  );

  // 发布（停止发布）
  const { mutateAsync: editRelease, isLoading: releaseLoading } =
    useEditReleaseQuestionnaire(useQuestionnairesQueryKey());

  const navigate = useNavigate();

  return (
    <ListContainer>
      {loading ? (
        <PageHeaderSkeletons len={list.length || 2} />
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

          let tagColor, statusText, buttonText, releaseIcon, releaseColor;
          if (status === 1) {
            tagColor = "blue";
            statusText = "未发布";
            buttonText = "发布";
            releaseIcon = <PlayCircleOutlined />;
            releaseColor = "#1E90FF";
          } else if (status === 2) {
            tagColor = "green";
            statusText = "发布中";
            buttonText = "停止";
            releaseIcon = <PauseCircleOutlined />;
            releaseColor = "#2E8B57";
          } else {
            tagColor = "yellow";
            statusText = "已结束";
            buttonText = "发布"; // 还需要设置截止时间
          }

          return (
            <Container>
              <PageHeader
                key={index}
                ghost={false}
                title={title}
                tags={<Tag color={tagColor}>{statusText}</Tag>}
                subTitle={description || ""}
                extra={[
                  <More
                    key={"3"}
                    name={"查看问卷"}
                    operations={[
                      <ButtonNoPadding
                        icon={<FolderViewOutlined />}
                        type={"link"}
                      >
                        <span> </span>
                        <Link to={`${String(id)}/preview`}>预览</Link>
                      </ButtonNoPadding>,
                      <ButtonNoPadding
                        icon={<PieChartOutlined />}
                        type={"link"}
                      >
                        <span> </span>
                        <Link to={`${String(id)}/analysis`}>统计分析</Link>
                      </ButtonNoPadding>,
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
                            title: `确定删除「${questionnaire.title}」吗？`,
                            content: "点击确定删除",
                            okText: "确定",
                            onOk() {
                              deleteQuestionnaire({ id })
                                .then(() => {
                                  message.success("删除成功");
                                })
                                .catch((e) => {
                                  message.error("删除失败");
                                });
                            },
                          });
                        },
                      },
                    ]}
                  />,
                  <Button
                    key="1"
                    type="primary"
                    shape={"round"}
                    icon={releaseIcon}
                    loading={releaseLoading}
                    style={{
                      backgroundColor: releaseColor,
                      borderColor: releaseColor,
                    }}
                    onClick={() => {
                      editRelease({
                        id: questionnaire.id,
                        status: status === 1 ? 2 : 1,
                      })
                        .then(() => {
                          message.success(
                            `${status === 1 ? "发布成功" : "停止发布成功"}`
                          );
                        })
                        .catch((e) => {
                          message.error(
                            `${status === 1 ? "发布失败" : "停止发布失败"}`
                          );
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
                      {/*<Statistic*/}
                      {/*  style={{*/}
                      {/*    marginRight: 32,*/}
                      {/*  }}*/}
                      {/*  title="填写链接"*/}
                      {/*  value={statusText}*/}
                      {/*/>*/}
                      <Statistic
                        title="答卷数量"
                        value={answerCount}
                        // valueStyle={{ color: "#3f8600" }}
                        prefix={<RiseOutlined />}
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
                          <Tooltip placement="topLeft" title={"点击复制"}>
                            <a
                              onClick={(event) => copyHandler(event, openCode)}
                            >
                              Click
                            </a>
                          </Tooltip>
                        ) : (
                          "还没发布"
                        )}
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                </div>
                <div>
                  <Checkbox onChange={(e) => checkBoxHandler(e, id)} />
                </div>
              </PageHeader>
            </Container>
          );
        })
      )}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  height: auto;
  width: 100%;
  background-color: #f5f5f5;
  flex: 1;
  overflow-x: auto;
  //::-webkit-scrollbar {
  //  display: none;
  //}
`;

const Container = styled.div`
  margin: 2rem 2rem 2rem 2rem;
`;
