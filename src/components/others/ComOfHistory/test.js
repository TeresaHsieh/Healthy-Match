import React from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-annotation";

class BarChart extends React.Component {
  render() {
    const data = [
      {
        label: "Apples",
        value: 10
      },
      {
        label: "Oranges",
        value: 17
      }
    ];
    const options = {
      annotation: {
        annotations: [
          {
            drawTime: "afterDatasetsDraw",
            borderColor: "red",
            borderDash: [2, 2],
            borderWidth: 2,
            mode: "vertical",
            type: "line",
            value: 10,
            scaleID: "x-axis-0",
            // This can be added inside annotation for label on the line
            label: {
              backgroundColor: "red",
              fontFamily: "sans-serif",
              fontSize: 10,
              fontStyle: "bold",
              fontColor: "#fff",
              textAlign: "center",
              xPadding: 4,
              yPadding: 4,
              cornerRadius: 4,
              position: "top",
              enabled: true,
              content: "Threshold"
            }
          }
        ]
      },
      maintainAspectRation: false
    };
    return <Bar data={data} width={100} height={50} options={options} />;
  }
}
export default BarChart;
