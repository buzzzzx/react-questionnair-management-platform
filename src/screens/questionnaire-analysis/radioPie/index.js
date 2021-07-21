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
      data: this.props.statistic?.option,
      celldata: [],
    };
    for (let option of this.props.statistic?.option) {
      this.setState({ celldata: this.state.celldata.push(option.name) });
    }
  }

  getOption = () => {
    let option = {
      title: {
        text: this.props.no + "、" + this.props.statistic?.title + "（单选题）",
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
          type: "pie",
          radius: "50%",
          data: this.state.data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          label: {
            formatter: "{b}: {@2012} ({d}%)",
          },
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
