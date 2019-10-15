import React from "react";
import * as c3 from "c3";
import sc from "styled-components";
import axios from "axios";
import Chart from "chart.js";

let myLineChart;

const LayoutBox = sc.div`
display: block;
border-radius: 4px;
box-sizing: border-box;
border: 1px solid #37474F;
box-shadow: 2px 2px 5px #9aafc3;
text-align: left;
`;

const Title = sc.div`
border-top-left-radius: 4px;
border-top-right-radius: 4px;
background: -webkit-linear-gradient(top, #536a75 0%, #011823);
padding: 2px 5px;
color: #fff;
height: 22px;
cursor: move;
`;

const LoaderBody = sc.div`
border-bottom-left-radius: 4px;
border-bottom-right-radius: 4px;
background: white;
display: flex;
flex-grow: 1;
align-items: center;
justify-content: center;
align-items: center; 
`;

const Body = sc.div`
border-bottom-left-radius: 4px;
border-bottom-right-radius: 4px;
background: white;
padding: 5px;
overflow: auto;
flex-grow: 1;
table {
  border solid 1px #CCC;
  border-collapse: collapse;
  border-spacing: 0;
  font: 15px Arial, sans-serif;
};
th {
  background-color: #F1F1F1;
  boder: solid 1px #CCC;
  color: #333;
  text-align: center;
};
td {
  border: solid 1px #CCC;hf_estimate_summary.funda1.ibes
  color: #333;
  padding: 2px 5px;
  text-shadow: 1px 1px 1px #fff;
  text-align: right;
};
`;



class Panel extends React.Component {
  chartRef = React.createRef();

  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.buildChart();
  }

  buildChart = () => {
    const myChartRef = this.chartRef.current.getContext("2d");
    const { date_list, value_list } = this.props;

    if (typeof myLineChart !== "undefined") myLineChart.destroy();

    myLineChart = new Chart(myChartRef, {
      type: "line",
      data: {
        labels: ["a","b"],
        datasets: [
          {
            label: "Timeseries return",
            data: [1,2]
          }
        ]
      }
    });


  }

  changeData = () => {
    let form = new FormData()
    form.append("start_date", 20160725)
    form.append("end_date", 20190729)
    form.append("model_name", "TPM_swhong_usa_190422.pea.minus.failing.pms.mt.univ2")
    axios.post("http://192.168.0.9:5001/api/timeseries/portfolio-performance/cum_return", form)
      .then(response => {
        const body = response.data.data;
        console.log(body);
        this.setState({
          date_list: body["date_list"],
          column1: body["value_list"]
        })
        console.log(body["date_list"])
        this.chart.data.labels = body["date_list"]
        this.chart.data.datasets[0].data = body["value_list"]
        this.chart.update();
      });
  }

  render() {
    return (
      <div>
        <canvas
          style={{ width: 800, height: 300 }}
          ref={this.chartRef}
        />
        <button onClick={this.changeData}>Change</button>
      </div>
    );
  }
}

export default Panel;