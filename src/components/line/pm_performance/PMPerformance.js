import React from "react";
import sc from "styled-components";
import axios from "axios";
import LineChart from "./LineChart" 

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



class PMPerformance extends React.Component {
  state = {
    date_list: ["a", "b"],
    value_list: [1, 2]
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
          value_list: body["value_list"]
        })
      });
  }

  render() {
    return (
      <div>
        <LineChart
          date_list={this.state.date_list}
          value_list={this.state.value_list}
        />
        <button onClick={this.changeData}>Change</button>
      </div>
    );
  }
}

export default PMPerformance;