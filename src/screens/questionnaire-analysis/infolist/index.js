import React from "react";
import "antd/dist/antd.css";
import { List, Divider } from "antd";
import dayjs from "dayjs";

class Infolist extends React.Component {
  render() {
    var data = [];
    var description = "问卷描述:  " + this.props.questionlist?.description;
    data.push(description);
    var question_num =
      "题目数量:  " + (this.props.questionlist?.questions).length;
    data.push(question_num);
    var id = "问卷ID:  " + this.props.questionlist?.id;
    data.push(id);
    var num = "答卷数量:  " + this.props.questionlist?.answerCount;
    data.push(num);
    var last_edit_time =
      "最后一次编辑时间:  " +
      (this.props.questionlist?.lastEditedTime === null
        ? "无"
        : dayjs(this.props.questionlist?.lastEditedTime).format(
            "YYYY/MM/DD  HH:mm"
          ));
    data.push(last_edit_time);
    var lauch_time =
      "发布时间:  " +
      (this.props.questionlist?.releaseTime === null
        ? "无"
        : dayjs(this.props.questionlist?.releaseTime).format(
            "YYYY/MM/DD  HH:mm"
          ));
    data.push(lauch_time);
    var deadline =
      "截止时间:  " +
      (this.props.questionlist?.endTime === null
        ? "无"
        : dayjs(this.props.questionlist?.endTime).format("YYYY/MM/DD  HH:mm"));
    data.push(deadline);
    return (
      <div>
        <Divider orientation="center">问卷信息</Divider>
        <List
          size="small"
          header={<div>{this.props.questionlist?.title}</div>}
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </div>
    );
  }
}

export default Infolist;
