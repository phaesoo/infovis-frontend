import React from "react";
import Chart from "chart.js";

let chartInstance;


class LineChart extends React.Component {
  chartRef = React.createRef();

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.buildChart();
  }

  buildChart = () => {
    const currentChartRef = this.chartRef.current.getContext("2d");
    const { date_list, value_list } = this.props;

    console.log(value_list);

    if (typeof chartInstance !== "undefined") chartInstance.destroy();

    chartInstance = new Chart(currentChartRef, {
      type: "line",
      data: {
        labels: date_list,
        datasets: [
          {
            label: "Return",
            data: value_list,
            fill: false,
            borderColor: "#6610f2"
          }
        ]
      }
    });
  }

  render() {
    return (
      <div>
        <canvas
          ref={this.chartRef}
        />
      </div>
    )
  }
}

export default LineChart;