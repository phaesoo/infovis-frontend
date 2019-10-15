import React from "react";
import * as c3 from "c3";
import sc from "styled-components";
import axios from "axios";

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
  border: solid 1px #CCC;
  color: #333;
  padding: 2px 5px;
  text-shadow: 1px 1px 1px #fff;
  text-align: right;
};
`;



class Memory extends React.Component {
  state = {
    date_list: ["date_list"],
    column1: ["data1"],
    //column2: ['data2', 100, 1, 50, 140, 150, 80],
  }

  renderChart() {
    c3.generate({
      bindto: "#chart1",
      data: {
        x: 'x',
        columns: [
          ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
//            ['x', '20130101', '20130102', '20130103', '20130104', '20130105', '20130106'],
          ['y', 130, 340, 200, 500, 250, 350],
          ['data1', 50, 200, 100, 400, 150, 250],
        ],
        type: "area-spline",
        groups: [['data1', 'data2']],
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%Y-%m-%d %H:%M:%S"
          },
        }
      },
      grid: {
        y: {
          show: true
        }
      }
    });
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  changeData = () => {
    let form = new FormData()
    form.append("start_date", 20160725)
    form.append("end_date", 20190729)
    form.append("model_name", "TPM_swhong_usa_190422.pea.minus.failing.pms.mt.univ2")
    axios.post("http://192.168.0.9:5001/api/timeseries/portfolio-performance/cum_return", form)
      .then(response => {
        const body = response.data.data;
        this.setState({
          date_list: ["date_list"].concat(body["date_list"]),
          column1: ["data2"].concat(body["value_list"])
        })
      });
  }

  render() {
    return (
      <LayoutBox>
        <div id="chart1"></div>
        <button onClick={this.changeData}>Change</button>
      </LayoutBox>
    );
  }
}

export default Memory;