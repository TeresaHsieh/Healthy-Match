import React from "react";
import { Line } from "react-chartjs-2";

import { connect } from "react-redux";
import { checkFirestoreRecordProtein } from "../../../store/actions/dailyAction";

class ProteinChart extends React.Component {
  componentDidMount = () => {
    console.log("123");
    this.props.checkFirestoreRecordProtein();
  };
  setGradientColor = (canvas, color) => {
    const ctx = canvas.getContext("2d");
    console.log(ctx);
    const gradient = ctx.createLinearGradient(0, 0, 600, 250);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.95, "rgba(245, 135, 73,0.75)");
    return gradient;
  };

  getChartDataProtein = canvas => {
    let proteinArray = this.props.recordTotalProtein;
    const data = {
      labels: ["MON", "TUE", "WED", "THR", "FRI", "SAT", "SUN"],
      datasets: [
        {
          label: "average",
          backgroundColor: "rgba(255, 184, 3,0.75)",
          data: [50, 50, 50, 50, 50, 50, 50]
        },
        {
          label: "week-protein",
          backgroundColor: "rgba(247, 237, 151,0.75)",
          data: proteinArray
        }
      ]
    };
    if (data.datasets) {
      let colors = ["rgba(247, 237, 151,0.75)", "rgba(255, 184, 3,0.75)"];
      data.datasets.forEach((set, i) => {
        set.backgroundColor = this.setGradientColor(canvas, colors[i]);
        set.borderColor = "white";
        set.borderWidth = 2;
      });
    }
    return data;
  };

  render() {
    return (
      <div>
        <h1> 蛋白質 </h1>
        <Line
          width="600"
          height="250"
          options={{ responsive: true }}
          data={this.getChartDataProtein}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    date: new Date().toLocaleDateString(),
    meals: state.daily.meals,
    recordTotalProtein: state.daily.recordTotalProtein
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // create a method
    checkFirestoreRecordProtein: recordProtein => {
      dispatch(checkFirestoreRecordProtein(recordProtein));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProteinChart);
