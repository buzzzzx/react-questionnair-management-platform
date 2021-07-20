import React, { Component } from "react";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import ReactEcharts from "echarts-for-react";

class Bar1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      celldata: [],
    };
    for (let option of this.props.statistic.option) {
      this.setState({
        data: this.state.data.push(option.value),
        celldata: this.state.celldata.push(option.name),
      });
    }
  }
  getOption = () => {
    let option = {
      title: {
        text:
          this.props.statistic.no +
          "、" +
          this.props.statistic.title +
          "（多选题）",
        left: "center",
      },
      xAxis: {
        type: "category",
        data: this.state.celldata,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: this.state.data,
          type: "bar",
          label: {
            show: true,
            position: "inside",
          },
          showBackground: true,
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
      ],
    };
    return option;
  };
  render() {
    return (
      <div>
        {" "}
        <ReactEcharts
          option={this.getOption()}
          theme="Imooc"
          style={{ width: 600, height: 384 }}
        />
        <br />
      </div>
    );
  }
}

export default Bar1;
