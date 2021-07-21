import React from "react";
import "antd/dist/antd.css";
import { List, Divider } from "antd";

class Textlist extends React.Component {
  render() {
    var data = this.props.statistic?.option;
    return (
      <div>
        <Divider orientation="center">
          {this.props.no + "、" + this.props.statistic?.title + "（文本题）"}
        </Divider>
        <List
          size="small"
          header={<div>{"答案列表"}</div>}
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </div>
    );
  }
}

export default Textlist;
