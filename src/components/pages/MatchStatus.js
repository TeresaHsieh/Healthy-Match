import React from "react";
import "../../css/status.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { checkFirestoreNutritionRecord } from "../../store/actions/dailyAction";
import { sentLastImgToReduxStore } from "../../store/actions/authAction";
import { sentDescriptionToReduxStore } from "../../store/actions/authAction";

// App Components
import Header from "../common/Header";
import MainMatch from "../../imgs/main-match.png";
import Happy from "../../imgs/happy.png";
import Unhappy from "../../imgs/unhappy.png";
import Backpack from "../../imgs/backpack.png";

class MatchStatus extends React.Component {
  constructor() {
    super();
    this.state = {
      matchAge: "",
      imgSrc: "",
      changeIMG: false,
      description: "我無話可說"
    };
  }

  // componentDidMount = () => {
  //   // let countDays = Number(this.props.userInfo.signUpDate);
  //   // let componentShowUpDay = new Date();
  //   // let year = componentShowUpDay.getFullYear();
  //   // let month = componentShowUpDay.getMonth() + 1; // if no plus one, the result would be August when expected September
  //   // let day = componentShowUpDay.getDate();

  //   // let yearString = year.toString();

  //   // let monthString = "";
  //   // if (month < 10) {
  //   //   monthString = "0" + month.toString();
  //   // } else {
  //   //   monthString = month.toString();
  //   // }

  //   // let dayString = "";
  //   // if (day < 10) {
  //   //   dayString = "0" + day.toString();
  //   // } else {
  //   //   dayString = day.toString();
  //   // }

  //   // let componentShowUpDate = Number(yearString + monthString + dayString); // default : componentShowUpDay
  //   // this.setState({ matchAge: componentShowUpDate - countDays });
  //   // console.log(componentShowUpDate, countDays);
  //   let test = this.props.auth.createdAt;
  //   let test2 = new Date();
  //   console.log("於啥時出生", test2);
  // };

  componentDidMount = () => {
    if (!this.props.recordTotalNutrition) {
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

      let userUID = this.props.auth.uid;
      this.props.checkFirestoreNutritionRecord(startDate, endDate, userUID);
      // this.setState({ imgSrc: this.props.userInfo.MatchCharacterIMG });
    }
  };

  componentDidUpdate = () => {
    let pass7daysRecord = [];
    if (
      this.props.recordTotalNutrition &&
      this.props.userInfo &&
      this.props.recordTotalName &&
      this.state.changeIMG == false
    ) {
      let historyRecord = this.props.recordTotalNutrition;
      let recordDays = Object.keys(historyRecord).map(function(key) {
        return [Number(key), historyRecord[key]];
      });

      for (let t = 0; t < recordDays.length; t++) {
        pass7daysRecord.push(recordDays[t][0]);
      }

      let pass7daysEating = pass7daysRecord.length;

      let ateFoodThisWeek = [];
      let alhohol = [];
      for (let i = 0; i < this.props.recordTotalName.length; i++) {
        ateFoodThisWeek.push(this.props.recordTotalName[i].name.foodName);
      }
      ateFoodThisWeek.forEach(function(item) {
        if (item.includes("酒")) {
          alhohol.push(item);
        }
      });

      let nutritionObject = this.props.recordTotalNutrition;

      let dataFatArray = [];
      let result = Object.keys(nutritionObject).map(function(key) {
        return { key: nutritionObject[key] };
      });

      const reducer = (accumulator, currentValue) => accumulator + currentValue;

      let fat;
      for (let d = 0; d < result.length; d++) {
        fat = result[d].key["粗脂肪(g)"];
        dataFatArray.push(fat);
      }

      let addUPFat = dataFatArray.reduce(reducer);

      let dataCalorieArray = [];
      let calorie;
      for (let d = 0; d < result.length; d++) {
        calorie = result[d].key["修正熱量(kcal)"];
        dataCalorieArray.push(calorie);
      }

      let addUPCalorie = dataCalorieArray.reduce(reducer);

      let dataProteinArray = [];
      let protein;
      for (let d = 0; d < result.length; d++) {
        protein = result[d].key["粗蛋白(g)"];
        dataProteinArray.push(protein);
      }

      let addUPProtein = dataProteinArray.reduce(reducer);

      let dataUserWeightArray = [];
      let userWeight = Number(this.props.userInfo.Weight);
      for (let d = 0; d < result.length; d++) {
        dataUserWeightArray.push(userWeight);
      }

      let addUPUserWeight = dataUserWeightArray.reduce(reducer);

      let dataVitaminCArray = [];
      let vitaminC;
      for (let d = 0; d < result.length; d++) {
        vitaminC = result[d].key["維生素C(mg)"];
        dataVitaminCArray.push(vitaminC);
      }

      let addUPVitaminC = dataVitaminCArray.reduce(reducer);

      let dataVitaminEArray = [];
      let vitaminE;
      for (let d = 0; d < result.length; d++) {
        vitaminE = result[d].key["維生素E總量(mg)"];
        dataVitaminEArray.push(vitaminE);
      }

      let addUPVitaminE = dataVitaminEArray.reduce(reducer);

      let dataMineralZnArray = [];
      let mineralZn;
      for (let d = 0; d < result.length; d++) {
        mineralZn = result[d].key["鋅(mg)"];
        dataMineralZnArray.push(mineralZn);
      }

      let addUPMineralZn = dataMineralZnArray.reduce(reducer);

      let addUPAllVitaminCEandZn =
        addUPVitaminC + addUPVitaminE + addUPMineralZn;

      let VitaminCEZNshouldTake = 1298 * result.length;

      let LastIMG;
      // no records last 4 days
      if (pass7daysEating >= 4) {
        console.log("換餓死圖");
        this.setState(
          {
            // imgSrc: this.props.userInfo.MatchCharacterIMGCarbohydrate,
            changeIMG: true,
            description: "你已經好久沒有來喂我了，哭哭"
          },
          () => this.props.sentDescriptionToReduxStore(this.state.description)
        );
        LastIMG = this.props.userInfo.MatchCharacterIMGCarbohydrate;
        this.props.sentLastImgToReduxStore(LastIMG);
      } else if (alhohol.length >= 3) {
        console.log("換喝醉圖");
        this.setState(
          {
            changeIMG: true,
            description: "哈囉主人～這週已經飲酒超過 3 次，"
          },
          () => this.props.sentDescriptionToReduxStore(this.state.description)
        );
        LastIMG = this.props.userInfo.MatchCharacterIMGAlcohol;
        this.props.sentLastImgToReduxStore(LastIMG);
      } else if (addUPFat > addUPCalorie * 0.35) {
        console.log("換肥胖圖");
        this.setState(
          {
            changeIMG: true,
            description: "你也太胖了吧！"
          },
          () => this.props.sentDescriptionToReduxStore(this.state.description)
        );
        LastIMG = this.props.userInfo.MatchCharacterIMGFat;
        this.props.sentLastImgToReduxStore(LastIMG);
      } else if (addUPProtein > addUPUserWeight) {
        console.log("換肌肉圖");

        let state = {
          changeIMG: true
        };

        state.description = `這週主人攝取的蛋白質已經超過總熱量的 35% 囉！因為 ${VitaminCEZNshouldTake} 蛋白質比較高的食物，要減少攝取喔！`;

        this.setState(state, () =>
          this.props.sentDescriptionToReduxStore(this.state.description)
        );
        LastIMG = this.props.userInfo.MatchCharacterIMGProtein;
        this.props.sentLastImgToReduxStore(LastIMG);
      } else if (VitaminCEZNshouldTake < addUPAllVitaminCEandZn) {
        console.log("換眼鏡圖");
        this.setState(
          {
            changeIMG: true,
            description: "再不攝取維他命，你就要戴眼鏡，單壓乘一"
          },
          () => this.props.sentDescriptionToReduxStore(this.state.description)
        );
        LastIMG = this.props.userInfo.MatchCharacterIMGVitamin;
        this.props.sentLastImgToReduxStore(LastIMG);
      } else {
        this.setState(
          {
            changeIMG: true,
            description: "歡迎回來～偶ㄉ主人"
          },
          () => this.props.sentDescriptionToReduxStore(this.state.description)
        );
        LastIMG = this.props.userInfo.MatchCharacterIMG;
        this.props.sentLastImgToReduxStore(LastIMG);
      }
    }
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="./member" />;

    return (
      <div>
        <Header />
        <div className="matchstatus-main">
          <div className="match-status">
            <span className="match-name"> {this.props.userInfo.MatchName}</span>
            <span className="match-backpack">
              <img src={Backpack} />
              <span>點擊背包！</span>
            </span>
            <span className="divide-line"></span>
            {/* <span className="match-mood">
              <span>心情值：</span>
              <img src={Happy} />
              <img src={Happy} />
              <img src={Happy} />
              <img src={Unhappy} />
              <img src={Unhappy} />
            </span>
            <span className="match-healthy">
              <span>健康值：</span>
              <img src={Happy} />
              <img src={Happy} />
              <img src={Happy} />
              <img src={Unhappy} />
              <img src={Unhappy} />
            </span> */}
            <span>
              年紀{" "}
              {Math.floor(
                Math.abs(new Date() - this.props.auth.createdAt) / 1000 / 86400
              )}{" "}
              天
            </span>

            <span>想對主人說：{this.props.description}</span>
          </div>
          <div className="backgroud">
            <img src={this.props.LastIMG} className="match-in-background" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    date: new Date().toLocaleDateString(),
    auth: state.firebase.auth,
    userInfo: state.firebase.profile,
    recordTotalNutrition: state.daily.recordTotalNutrition,
    recordTotalName: state.daily.recordTotalName,
    recordTotalServe: state.daily.recordTotalServe,
    recordTotalMeal: state.daily.recordTotalMeal,
    startDate: state.daily.startDate,
    endDate: state.daily.endDate,
    usingFilterFunction: state.daily.usingFilterFunction,
    LastIMG: state.auth.LastIMG,
    description: state.auth.description
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // create a method
    checkFirestoreNutritionRecord: (startDate, endDate, userUID) => {
      dispatch(checkFirestoreNutritionRecord(startDate, endDate, userUID));
    },
    sentLastImgToReduxStore: LastIMG => {
      dispatch(sentLastImgToReduxStore(LastIMG));
    },
    sentDescriptionToReduxStore: stateDescription => {
      dispatch(sentDescriptionToReduxStore(stateDescription));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchStatus);
