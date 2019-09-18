import React from "react";
import { Line } from "react-chartjs-2";

import { connect } from "react-redux";
import { checkFirestoreNutritionRecord } from "../../../store/actions/dailyAction";

class VitaminChart extends React.Component {
  constructor() {
    super();
    this.state = {
      dataUpdate: ""
    };
  }

  componentDidMount = () => {
    // count end date
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1; // if no plus one, the result would be August when expected September
    let day = today.getDate();

    let yearString = year.toString();

    let monthString = "";
    if (month < 10) {
      monthString = "0" + month.toString();
    } else {
      monthString = month.toString();
    }

    let dayString = "";
    if (day < 10) {
      dayString = "0" + day.toString();
    } else {
      dayString = day.toString();
    }

    // count 7 days ago
    let weekAgoDate = new Date();
    weekAgoDate.setDate(weekAgoDate.getDate() - 6);
    let weekAgoYear = weekAgoDate.getFullYear();
    let weekAgoMonth = weekAgoDate.getMonth() + 1;
    let weekAgoDay = weekAgoDate.getDate();

    let weekAgoYearString = weekAgoYear.toString();
    let weekAgoMonthString = "";

    if (weekAgoMonth < 10) {
      weekAgoMonthString = "0" + weekAgoMonth.toString();
    } else {
      weekAgoMonthString = weekAgoMonth.toString();
    }

    let weekAgoDayString = "";
    if (weekAgoDay < 10) {
      weekAgoDayString = "0" + weekAgoDay.toString();
    } else {
      weekAgoDayString = weekAgoDay.toString();
    }

    let startDate = weekAgoYearString + weekAgoMonthString + weekAgoDayString; // default : 7 days before today
    let endDate = yearString + monthString + dayString; // default : today

    this.props.checkFirestoreNutritionRecord(startDate, endDate);
  };

  render() {
    //const getChartDataProtein = canvas => {
    if (this.props.recordTotalNutrition == undefined) {
      return (
        <div>
          <Line width="600" height="250" options={{ responsive: true }} />
        </div>
      );
    } else {
      let nutritionObject = this.props.recordTotalNutrition;
      console.log("nutritionObject", nutritionObject);
      let dataVitaminArrayTotal = [];

      let dataVitaminArrayTE = []; //α-維生素E當量(α-TE)(mg)
      let dataVitaminArrayB1 = []; //維生素B1(mg)
      let dataVitaminArrayB2 = []; //維生素B2(mg)
      let dataVitaminArrayB6 = []; //維生素B6(mg)
      let dataVitaminArrayB12 = []; //維生素B12(ug)
      let dataVitaminArrayC = []; // 維生素C(mg)
      let dataVitaminArrayE = []; // 維生素E總量(mg)

      let result = Object.keys(nutritionObject).map(function(key) {
        return { key: nutritionObject[key] };
      });
      console.log("get the data in redux store222");
      let vitaminTE;
      for (let d = 0; d < result.length; d++) {
        vitaminTE = result[d].key["α-維生素E當量(α-TE)(mg)"];
        dataVitaminArrayTE.push(vitaminTE);
      }
      let vitaminB1;
      for (let d = 0; d < result.length; d++) {
        vitaminB1 = result[d].key["維生素B1(mg)"];
        dataVitaminArrayB1.push(vitaminB1);
      }
      let vitaminB2;
      for (let d = 0; d < result.length; d++) {
        vitaminB2 = result[d].key["維生素B2(mg)"];
        dataVitaminArrayB2.push(vitaminB2);
      }
      let vitaminB6;
      for (let d = 0; d < result.length; d++) {
        vitaminB6 = result[d].key["維生素B6(mg)"];
        dataVitaminArrayB6.push(vitaminB6);
      }
      let vitaminB12;
      for (let d = 0; d < result.length; d++) {
        vitaminB12 = result[d].key["維生素B12(ug)"];
        dataVitaminArrayB12.push(vitaminB12);
      }
      let vitaminC;
      for (let d = 0; d < result.length; d++) {
        vitaminC = result[d].key["維生素C(mg)"];
        dataVitaminArrayC.push(vitaminC);
      }
      let vitaminE;
      for (let d = 0; d < result.length; d++) {
        vitaminE = result[d].key["維生素E總量(mg)"];
        dataVitaminArrayE.push(vitaminE);
      }

      for (let t = 0; t < result.length; t++) {
        dataVitaminArrayTotal.push(
          dataVitaminArrayTE[t] +
            dataVitaminArrayB1[t] +
            dataVitaminArrayB2[t] +
            dataVitaminArrayB6[t] +
            dataVitaminArrayB12[t] +
            dataVitaminArrayC[t] +
            dataVitaminArrayE[t]
        );
      }

      console.log("happy", dataVitaminArrayTotal);
      // };

      // const drawDataOnChart = dataProteinArray => {
      //   console.log("hope", dataProteinArray);

      //drawDataOnChart(dataProteinArray);
      console.log("hopewowo", dataVitaminArrayTotal);
      const data = {
        labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
        datasets: [
          {
            label: "average",
            backgroundColor: "rgba(255, 184, 3,0.75)",
            data: [300, 300]
          },
          {
            label: "week-protein",
            backgroundColor: "rgba(247, 237, 151,0.75)",
            data: dataVitaminArrayTotal
          }
        ]
      };
      console.log("data", data);
      if (data.datasets) {
        let colors = ["rgba(247, 237, 151,0.75)", "rgba(255, 184, 3,0.75)"];
        console.log(data.datasets);
        data.datasets.forEach(set => {
          //set.backgroundColor = setGradientColor(canvas, colors[i]);
          set.borderColor = "white";
          set.borderWidth = 2;
        });
      }

      // };
      return (
        <div>
          <Line
            width="600"
            height="250"
            options={{ responsive: true }}
            data={data}
          />
        </div>
      );
    }

    // const setGradientColor = (canvas, color) => {
    //   const ctx = canvas.getContext("2d");
    //   console.log(ctx);
    //   const gradient = ctx.createLinearGradient(0, 0, 600, 250);
    //   gradient.addColorStop(0, color);
    //   gradient.addColorStop(0.95, "rgba(245, 135, 73,0.75)");
    //   return gradient;
    // };
  }
}

const mapStateToProps = state => {
  return {
    recordTotalNutrition: state.daily.recordTotalNutrition
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // create a method
    checkFirestoreNutritionRecord: (startDate, endDate) => {
      dispatch(checkFirestoreNutritionRecord(startDate, endDate));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VitaminChart);
