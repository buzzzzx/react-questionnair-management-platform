import React from "react";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import ReactEcharts from "echarts-for-react";

class Pie1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.statistic.option,
      celldata: [],
    };
    for (let option of this.props.statistic.option) {
      this.setState({ celldata: this.state.celldata.push(option.name) });
    }
  }

  getOption = () => {
    let option = {
      title: {
        text:
          this.props.statistic.no +
          "、" +
          this.props.statistic.title +
          "（单选题）",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        show: true,
        left: "center",
        top: "bottom",
        data: this.state.celldata,
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: {
            show: true,
            type: ["pie", "funnel"],
          },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: "分数",
          type: "pie",
          radius: [30, 110],
          center: ["50%", "50%"],
          emphasis: { focus: "data" },
          label: {
            formatter: "{b}: {@2012} ({d}%)",
          },
          roseType: "area",
          data: this.state.data,
        },
      ],
    };
    return option;
  };

  render() {
    return (
      <div>
        <ReactEcharts
          option={this.getOption()}
          theme="Imooc"
          style={{ width: 1000, height: 400 }}
        />
      </div>
    );
  }
}

export default Pie1;
