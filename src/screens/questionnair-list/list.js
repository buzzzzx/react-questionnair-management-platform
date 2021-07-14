import {
  Button,
  Descriptions,
  PageHeader,
  Statistic,
  Tag,
  Modal,
  Tooltip,
  message,
  Switch,
  Space,
} from "antd";
import { More } from "./more";
import dayjs from "dayjs";
import {
  useDeleteQuestionnaire,
  useEditQuestionnaire,
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
  CloudDownloadOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { PageHeaderSkeletons } from "./pageheader-skeleton";
import copy from "copy-to-clipboard";
import { useEffect, useState } from "react";
import { download } from "../../utils/excel";
import { EndTimePicker } from "./end-time-picker";

/** @jsxImportSource @emotion/react */
export const List = ({
  list,
  loading,
  deletes,
  setDeletes,
  hoverQuestionnaire,
  setHoverQuestionnaire,
  showAll,
  setShowAll,
}) => {
  // 路由：创建，预览，统计分析，编辑，填写链接
  // Skeleton
  // 批量删除
  // 提示 message：删除，发布/停止发布，复制链接
  // 填写链接：点击 copy
  // 已结束状态
  //    已结束状态不能够再发布，修改截止时间，编辑操作，disable，在修改截止时间，编辑操作，修改发布时 refetch 更新数据
  //    状态为已结束时发布图标为 <ClockCircleOutlined />
  //    截止时间不能选择小于今天的天数，不能选择小于当前时间的时间

  useEffect(() => {
    if (deletes.length !== 0) {
      setShowAll(true);
    } else {
      setShowAll(false);
    }
  }, [deletes]);

  const mouseEnterHandler = (id) => {
    setHoverQuestionnaire(id);
  };

  const mouseLeaveHandler = (id) => {
    setHoverQuestionnaire(null);
  };

  // handle switch
  const switchHandler = (checked, evt, id) => {
    if (checked) {
      setDeletes([...deletes, id]);
    } else {
      const filtered = deletes.filter((quesId) => quesId !== id);
      setDeletes(filtered);
    }
  };

  // 点击填写链接 copy to clipboard
  const copyHandler = (e, openCode) => {
    // FIXME 网站链接
    const copyLink = `http://localhost:3000/fill/${openCode}`;
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
    useEditQuestionnaire(useQuestionnairesQueryKey());

  const navigate = useNavigate();

  return (
    <ListContainer>
      {loading ? (
        <PageHeaderSkeletons />
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
            endTime,
            openCode,
          } = questionnaire;

          let tagColor, statusText, buttonText, releaseIcon, releaseColor;
          if (status === 1) {
            // 未发布状态
            tagColor = "blue";
            statusText = "未发布";
            buttonText = "发布";
            releaseIcon = <PlayCircleOutlined />;
            releaseColor = "#1E90FF";
          } else if (status === 2) {
            // 已发布状态
            tagColor = "green";
            statusText = "发布中";
            buttonText = "停止";
            releaseIcon = <PauseCircleOutlined />;
            releaseColor = "#2E8B57";
          } else {
            // 已结束状态
            tagColor = "yellow";
            statusText = "已结束";
            buttonText = "结束";
            releaseIcon = <ClockCircleOutlined />;
            releaseColor = "#FFFACD";
          }

          return (
            <Container
              key={index}
              onMouseEnter={() => mouseEnterHandler(id)}
              onMouseLeave={() => mouseLeaveHandler(id)}
            >
              <PageHeader
                css={{
                  "&:hover": {
                    // backgroundColor: "#F5F5DC",
                    backgroundColor: "#EEE9E9",
                  },
                }}
                ghost={false}
                title={title}
                tags={<Tag color={tagColor}>{statusText}</Tag>}
                subTitle={description || ""}
                extra={[
                  showAll || hoverQuestionnaire === id ? (
                    <Switch
                      key={"4"}
                      size={"small"}
                      checked={deletes.includes(id)}
                      onChange={(checked, evt) =>
                        switchHandler(checked, evt, id)
                      }
                    />
                  ) : null,
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
                      <ButtonNoPadding
                        icon={<CloudDownloadOutlined />}
                        type={"link"}
                        onClick={() => download(id)}
                      >
                        <span> </span>
                        导出 Excel
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
                                title: `「${questionnaire.title}」正在发布中`,
                                content: "请先停止发布再进行编辑！",
                                okText: "确定",
                                cancelText: "取消",
                              })
                            : status === 3
                            ? Modal.confirm({
                                title: `「${questionnaire.title}」已结束`,
                                content: "不能再进行编辑，请考虑新建问卷！",
                                okText: "确定",
                                cancelText: "取消",
                              })
                            : navigate(`${String(id)}/editing`);
                        },
                      },
                      {
                        name: "删除",
                        handler: () => {
                          Modal.confirm({
                            title: `确定删除「${title}」吗？`,
                            content: "点击确定删除",
                            okText: "确定",
                            cancelText: "取消",
                            onOk() {
                              deleteQuestionnaire({ id })
                                .then(() => {
                                  message.success(`删除「${title}」成功`);
                                  if (deletes.includes(id)) {
                                    const filtered = deletes.filter(
                                      (quesId) => quesId !== id
                                    );
                                    setDeletes(filtered);
                                  }
                                })
                                .catch((e) => {
                                  message.error(`删除「${title}」成功`);
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
                    disabled={status === 3}
                    icon={releaseIcon}
                    loading={releaseLoading}
                    style={{
                      backgroundColor: releaseColor,
                      borderColor: releaseColor,
                    }}
                    onClick={() => {
                      if (status === 3) {
                        message.error("该问卷已结束");
                        return;
                      }
                      editRelease({
                        id: questionnaire.id,
                        status: status === 1 ? 2 : 1,
                      })
                        .then(() => {
                          message.success(
                            `${
                              status === 1
                                ? `发布「${title}」成功`
                                : `停止发布「${title}」成功`
                            }`
                          );
                        })
                        .catch((e) => {
                          message.error(
                            `${
                              status === 1
                                ? `发布「${title}」失败`
                                : `停止发布「${title}」失败`
                            }`
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
                          : "无"}
                      </Descriptions.Item>
                      <Descriptions.Item label="截止时间">
                        <EndTimePicker
                          questionnaireStatus={status}
                          endTime={endTime}
                          questionnaireId={id}
                        />
                      </Descriptions.Item>
                      <Descriptions.Item label="填写链接">
                        {openCode ? (
                          <Space>
                            <Tooltip placement="topLeft" title={"点击复制"}>
                              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                              <a
                                onClick={(event) =>
                                  copyHandler(event, openCode)
                                }
                              >
                                复制
                              </a>
                            </Tooltip>
                            <a
                              href={`http://localhost:3000/fill/${openCode}`}
                              target={"_blank"}
                            >
                              打开
                            </a>
                          </Space>
                        ) : (
                          "无"
                        )}
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
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
  width: 100%;
  background-color: #f5f5f5;
  flex: 1;
  overflow-x: auto;
  //::-webkit-scrollbar {
  //  display: none;
  //}
`;

const Container = styled.div`
  margin: 2rem 1.5rem 2rem 1.5rem;
`;
