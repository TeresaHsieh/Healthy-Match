// All imports
import React from "react";
import { connect } from "react-redux";

// App Components, Actions and CSS
import { Line } from "react-chartjs-2";
import { checkFirestoreNutritionRecord } from "../../../store/actions/dailyAction";
import { removeUsingFilterFunction } from "../../../store/actions/dailyAction";
import "../../../css/history.css";

class VitaminChart extends React.Component {
  constructor() {
    super();
    this.state = {
      dataUpdate: ""
    };
  }

  componentWillUnmount = () => {
    this.props.removeUsingFilterFunction();
  };

  render() {
    if (
      this.props.recordTotalNutrition == undefined &&
      this.props.recordTotalName == undefined &&
      this.props.recordTotalServe == undefined
    ) {
      return (
        <div className="lineCharts">
          <Line
            width={600}
            height={250}
            options={{ responsive: true, maintainAspectRatio: true }}
          />
        </div>
      );
    } else {
      let nutritionObject = this.props.recordTotalNutrition;
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
            // dataVitaminArrayB12[t] +
            // dataVitaminArrayC[t] +
            dataVitaminArrayE[t]
        );
      }

      // sum of B1 + B2 + B6 + B12 + C + E
      let times = dataVitaminArrayTotal.length;
      let vitamin =
        50 +
        100 +
        80 +
        // 1000 + 1000 +
        268;
      let averageArray = [];
      for (let t = 0; t < times; t++) {
        averageArray.push(vitamin);
        console.log(averageArray);
      }

      let theDays = [];
      // if using filter time function, rearrange days label
      if (this.props.usingFilterFunction == true) {
        let daysInProps = this.props.recordTotalNutrition;
        let theDaysResult = Object.keys(daysInProps).map(function(key) {
          return [Number(key), daysInProps[key]];
        });
        for (let t = 0; t < theDaysResult.length; t++) {
          theDays.push(theDaysResult[t][0].toString());
        }
      } else {
        let daysInProps = this.props.recordTotalNutrition;
        let theDaysResult = Object.keys(daysInProps).map(function(key) {
          return [Number(key), daysInProps[key]];
        });
        for (let t = 0; t < theDaysResult.length; t++) {
          theDays.push(theDaysResult[t][0].toString());
        }
      }

      const data = {
        labels: theDays,
        datasets: [
          {
            label: "Average",
            backgroundColor: "rgba(255, 184, 3,0.75)",
            borderColor: "rgb(255, 184, 3)",
            backgroundColor: "rgb(255, 184, 3)",
            data: averageArray
          },
          {
            label: "Weekly-Vitamin",
            backgroundColor: "rgba(247, 237, 151,0.75)",
            borderColor: "rgb(247, 237, 151)",
            backgroundColor: "rgb(247, 237, 151)",
            data: dataVitaminArrayTotal
          }
        ]
      };

      let meal = this.props.recordTotalMeal;
      let dateAndName = this.props.recordTotalName;
      let serve = this.props.recordTotalServe;

      let theDate;
      let dateArray;

      let labelArray = {};
      let labelObject;
      let object = {};

      let detailArray = [];
      let resultArray = [];

      let test;
      let key;

      for (let o = 0; o < dateAndName.length; o++) {
        theDate = dateAndName[o].date;
        labelObject =
          meal[o] +
          " : " +
          dateAndName[o].name.foodName +
          " " +
          serve[o] +
          " 份 ";

        if (!labelArray[theDate]) {
          labelArray[theDate] = [];
        }

        if (labelArray[theDate].detail) {
          labelArray[theDate].detail.push(labelObject);
        } else {
          labelArray[theDate].detail = [labelObject];
        }
      }

      for (key in labelArray) {
        detailArray.push(labelArray[key]);
      }

      for (let i = 0; i < detailArray.length; i++) {
        resultArray.push(detailArray[i].detail);
      }

      const option = {
        responsive: true,
        maintainAspectRatio: true,
        title: {
          display: true,
          position: "top",
          text: "維他命（B1、B2、B6、B12、C、E）攝取紀錄",
          fontSize: 12,
          fontColor: "grey"
        },
        tooltips: {
          enabled: true,
          mode: "single",
          callbacks: {
            label: function(tooltipItems, data) {
              let multistringText = [tooltipItems.yLabel];
              for (let x = 0; x < resultArray[tooltipItems.index].length; x++) {
                multistringText.push(resultArray[tooltipItems.index][x]);
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
            fontSize: 12
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

      if (data.datasets) {
        data.datasets.forEach(set => {
          set.pointHoverBackgroundColor = "red";
          set.pointHoverBorderColor = "red";

          set.borderWidth = 3;
          set.borderJoinStyle = "miter";
          set.borderCapStyle = "round";
          set.fill = "false";
        });
      }
      return (
        <div className="lineCharts">
          <Line width={600} height={250} options={option} data={data} />
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
    recordTotalMeal: state.daily.recordTotalMeal,
    auth: state.firebase.auth,
    userInfo: state.firebase.profile,
    startDate: state.daily.startDate,
    endDate: state.daily.endDate,
    usingFilterFunction: state.daily.usingFilterFunction
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // create a method
    checkFirestoreNutritionRecord: (startDate, endDate, userUID) => {
      dispatch(checkFirestoreNutritionRecord(startDate, endDate, userUID));
    },
    removeUsingFilterFunction: () => {
      dispatch(removeUsingFilterFunction());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VitaminChart);
