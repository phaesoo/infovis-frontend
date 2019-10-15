import React from "react";
import Chart from "chart.js";
import {map} from "lodash";

let chartInstance;

Chart.defaults.LineWithLine = Chart.defaults.line;
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
   draw: function(ease) {
      Chart.controllers.line.prototype.draw.call(this, ease);

      if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
         var activePoint = this.chart.tooltip._active[0],
             ctx = this.chart.ctx,
             x = activePoint.tooltipPosition().x,
             topY = this.chart.scales['y-axis-0'].top,
             bottomY = this.chart.scales['y-axis-0'].bottom;

         // draw line
         ctx.save();
         ctx.beginPath();
         ctx.moveTo(x, topY);
         ctx.lineTo(x, bottomY);
         ctx.lineWidth = 2;
         ctx.strokeStyle = '#07C';
         ctx.stroke();
         ctx.restore();
      }
   }
});

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

    let values = map(date_list, function(x){
        return String(x);
    })

    let temp = map(date_list, function(x, index){
      if (index % 7 === 0) {
        return String(x);
      } else {
        return "";
      }
    })


    console.log(temp)

    chartInstance = new Chart(currentChartRef, {
      type: "line",
      data: {
        labels: values,
        datasets: [
          {
            label: "Return",
            data: value_list,
            fill: false,
            borderColor: "#6610f2",
            borderWidth: "1",
            pointRadius: 0
          }
        ]
      },
      options: {
        scales: {
          xAxes: [{
            type: "category",
            gridLines: {
              display: false,
            },
            labels: temp,

            ticks: {
            }
          }]
        },
        animation: {
          duration: 0
        },
        hover: {
          animationDuration: 0
        },
        responsuveAnimationDuration: 0,
        elements: {
          line: {
            tension: 0
          }
        },
        tooltips: {
          intersect: false
        }
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