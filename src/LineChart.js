import React from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import "./App.css";

const LineChart = (props) => {
  const _labels = props.chartData.map((value) => {
    return value[0];
  });

  const _data = props.chartData.map((value) => {
    return value[1];
  });

  const data = {
    labels: _labels,
    datasets: [
      {
        label: "24hr Price",
        backgroundColor: "rgb(255, 99, 132",
        borderColor: "rgb(255, 99, 132",
        data: _data,
      },
    ],
  };

  return (
    <div className="LineChart">
      <Line data={data} />
    </div>
  );
};

export default LineChart;
