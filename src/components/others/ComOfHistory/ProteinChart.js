import React from "react";
import { Line } from "react-chartjs-2";

import { connect } from "react-redux";
import { checkFirestoreNutritionRecord } from "../../../store/actions/dailyAction";

class ProteinChart extends React.Component {
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
    if (
      this.props.recordTotalNutrition == undefined &&
      this.props.recordTotalName == undefined &&
      this.props.recordTotalServe == undefined
    ) {
      return (
        <div>
          <Line width="600" height="250" options={{ responsive: true }} />
        </div>
      );
    } else {
      // handling nutrition
      let nutritionObject = this.props.recordTotalNutrition;
      // console.log("nutritionObject", nutritionObject);
      let dataProteinArray = [];
      let result = Object.keys(nutritionObject).map(function(key) {
        return { key: nutritionObject[key] };
      });
      // console.log("get the data in redux store222");
      let protein;
      for (let d = 0; d < result.length; d++) {
        protein = result[d].key["粗蛋白(g)"];
        dataProteinArray.push(protein);
      }

      // handling name and serve
      //  let nameObject = this.props.recordTotalName;
      //  console.log("nutritionObject", nutritionObject);
      //  let dataProteinArray = [];
      //  let result = Object.keys(nutritionObject).map(function(key) {
      //    return { key: nutritionObject[key] };
      //  });
      //  console.log("get the data in redux store222");
      //  let protein;
      //  for (let d = 0; d < result.length; d++) {
      //    protein = result[d].key["粗蛋白(g)"];
      //    dataProteinArray.push(protein);
      //  }

      // };

      // const drawDataOnChart = dataProteinArray => {
      //   console.log("hope", dataProteinArray);

      //drawDataOnChart(dataProteinArray);
      // console.log("hopewowo", dataProteinArray);
      const data = {
        labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
        datasets: [
          {
            label: "average",
            borderColor: "rgb(255, 184, 3)",
            backgroundColor: "rgb(255, 184, 3)",
            data: [300, 56]
          },
          {
            label: "week-protein",
            borderColor: "rgb(247, 237, 151)",
            backgroundColor: "rgb(247, 237, 151)",
            data: dataProteinArray
          }
        ]
      };

      let meal = this.props.recordTotalMeal;
      let dateAndName = this.props.recordTotalName;
      let theDate;
      let dateArray;
      let serve = this.props.recordTotalServe;
      let labelArray = [];
      let labelObject = {};
      let detailArray = [];
      let details;

      for (let o = 0; o < dateAndName.length; o++) {
        theDate = dateAndName[o].date;
        console.log("ththththth", theDate);
        labelObject = [
          meal[o] +
            " : " +
            dateAndName[o].name.foodName +
            " " +
            serve[o] +
            " 份 "
        ];

        if (!labelArray[theDate]) {
          labelArray[theDate] = {};
        }
        if (labelArray[theDate].detail) {
          labelArray[theDate].detail.push(labelObject);
        } else {
          labelArray[theDate].detail = labelObject;
        }
        console.log("momonono", labelArray);
      }

      let teresa = [
        ["早餐：漢堡 2 份", "食物2"],
        ["食物5"],
        ["食物3"],
        ["食物4"]
      ];
      console.log(teresa[1]);
      const option = {
        responsive: true,
        title: {
          display: true,
          position: "top",
          text: "蛋白質攝取紀錄",
          fontSize: 18,
          fontColor: "grey"
        },
        tooltips: {
          enabled: true,
          mode: "single",
          callbacks: {
            label: function(tooltipItems, data) {
              let multistringText = [tooltipItems.yLabel];
              for (let x = 0; x < teresa[tooltipItems.index].length; x++) {
                multistringText.push(teresa[tooltipItems.index][x]);
              }
              return multistringText;
            },
            title: function(tooltipItems, data) {
              let title = ["當天飲食"];
              return title;
            }
          }
        },
        legend: {
          display: true,
          position: "bottom",
          labels: {
            fontColor: "#333",
            fontSize: 16
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0
              }
            }
          ]
        }
      };
      // console.log("data", data);
      // const setGradientColor = (canvas, color) => {
      //   const ctx = canvas.getContext("2d");
      //   console.log(ctx);
      //   const gradient = ctx.createLinearGradient(0, 0, 600, 250);
      //   gradient.addColorStop(0, color);
      //   gradient.addColorStop(0.95, "rgba(245, 135, 73,0.75)");
      //   return gradient;
      // };
      if (data.datasets) {
        //let colors = ["rgba(247, 237, 151,0.75)", "rgba(255, 184, 3,0.75)"];
        // console.log(data.datasets);
        data.datasets.forEach(set => {
          //set.backgroundColor = setGradientColor(canvas, colors[i]);
          //set.borderColor = "rgb(255, 184, 3)";
          set.pointHoverBackgroundColor = "red";
          set.pointHoverBorderColor = "red";

          set.borderWidth = 3;
          set.borderJoinStyle = "miter";
          set.borderCapStyle = "round";
          set.fill = "false";
        });
      }

      // };
      return (
        <div>
          <Line width="600" height="250" options={option} data={data} />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    recordTotalNutrition: state.daily.recordTotalNutrition,
    recordTotalName: state.daily.recordTotalName,
    recordTotalServe: state.daily.recordTotalServe,
    recordTotalMeal: state.daily.recordTotalMeal
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
)(ProteinChart);
