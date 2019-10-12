// All imports
import React, { useImperativeHandle } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

// App Components, Actions and CSS
import Header from "../common/Header";
import MainMatch from "../../imgs/main-match.png";
import { checkFirestoreNutritionRecord } from "../../store/actions/dailyAction";
import { sentLastImgToReduxStore } from "../../store/actions/authAction";
import { sentDescriptionToReduxStore } from "../../store/actions/authAction";
import { removeIMGandDescription } from "../../store/actions/authAction";
import "../../css/status.css";

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
      if (userUID) {
        this.props.checkFirestoreNutritionRecord(startDate, endDate, userUID);
      }
      // this.setState({ imgSrc: this.props.userInfo.MatchCharacterIMG });
    }
  };

  componentWillUnmount = () => {
    this.props.removeIMGandDescription();
  };

  componentDidUpdate = () => {
    let pass7daysRecord = [];
    if (
      this.props.recordTotalNutrition &&
      this.props.userInfo &&
      this.props.recordTotalName &&
      this.state.changeIMG == false &&
      this.props.description == undefined &&
      this.props.userInfo.MatchCharacterIMG == undefined
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
      if (pass7daysEating < 5) {
        let state = {
          changeIMG: true
        };
        state.description = `你已經好久沒有來喂我了(´；ω；｀) 快到「每日記錄」新增飲食吧！`;
        this.setState(state, () =>
          this.props.sentDescriptionToReduxStore(this.state.description)
        );
        LastIMG = this.props.userInfo.MatchCharacterIMGCarbohydrate;
        this.props.sentLastImgToReduxStore(LastIMG);
      } else if (alhohol.length >= 3) {
        let state = {
          changeIMG: true
        };
        state.description = `本週飲酒次數已經 ${alhohol.length} 次囉！根據醫學期刊《The Lancet》研究結果，每週飲酒上限應在每星期 100 克純酒精。長期過度飲酒，除了容易引發心肌梗塞以外的心臟疾病，也容易容易罹癌、導致肝臟疾病喔！`;
        this.setState(state, () =>
          this.props.sentDescriptionToReduxStore(this.state.description)
        );
        LastIMG = this.props.userInfo.MatchCharacterIMGAlcohol;
        this.props.sentLastImgToReduxStore(LastIMG);
      } else if (addUPFat > addUPCalorie * 0.35) {
        let state = {
          changeIMG: true
        };
        state.description = `雖然缺乏油脂會導致「必需脂肪酸」缺乏，，進而影響生理狀態及代謝作用。但根據國健署建議，每天人類脂肪攝取量不應超過每日熱量的 20%-30%，目前本週以攝取 ${addUPFat}g，超出快要 ${Math.ceil(
          addUPFat / addUPCalorie
        )} 倍了！要多多注意喔～`;
        this.setState(state, () =>
          this.props.sentDescriptionToReduxStore(this.state.description)
        );
        LastIMG = this.props.userInfo.MatchCharacterIMGFat;
        this.props.sentLastImgToReduxStore(LastIMG);
      } else if (addUPProtein > addUPUserWeight) {
        let state = {
          changeIMG: true
        };

        state.description = `目前攝取的蛋白質已經超過 ${addUPProtein -
          addUPUserWeight}g 囉！根據國民健康署建議，每天蛋白質建議的攝取量應為體重公斤數的一倍，但這週共攝取 ${addUPProtein}g 的蛋白質！下週要再更注意～否則長期高蛋白攝取將會在體內堆積過多含氮廢物，如氨、尿素及尿酸等，將增加腎臟排除含氮廢物的負擔、引發腎損傷 > <`;

        this.setState(state, () =>
          this.props.sentDescriptionToReduxStore(this.state.description)
        );
        LastIMG = this.props.userInfo.MatchCharacterIMGProtein;
        this.props.sentLastImgToReduxStore(LastIMG);
      } else if (VitaminCEZNshouldTake < addUPAllVitaminCEandZn) {
        let state = {
          changeIMG: true
        };
        state.description = `嗚嗚～看來本週的維生素 C、維生素 E、鋅攝取不足喔！這些都是保護眼睛的好營養素～建議每天攝取維生素 C 100mg、維生素 E 13mg、鋅 15mg 喔！本週還差約 ${Math.abs(
          Math.ceil(VitaminCEZNshouldTake - addUPAllVitaminCEandZn)
        )}mg，加油加油！`;
        this.setState(state, () =>
          this.props.sentDescriptionToReduxStore(this.state.description)
        );
        LastIMG = this.props.userInfo.MatchCharacterIMGVitamin;
        this.props.sentLastImgToReduxStore(LastIMG);
      } else {
        let state = {
          changeIMG: true
        };
        state.description = `歡迎回來看我～～～今天新增飲食記錄了嗎 ⁎⁍̴̛ᴗ⁍̴̛⁎`;
        this.setState(state, () =>
          this.props.sentDescriptionToReduxStore(this.state.description)
        );
        LastIMG = this.props.userInfo.MatchCharacterIMG;
        this.props.sentLastImgToReduxStore(LastIMG);
      }
    }
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="./member" />;
    }

    if (this.props.LastIMG) {
      return (
        <div>
          <Header />
          <div className="matchstatus-main">
            <div className="match-status">
              <span className="match-name">
                {" "}
                {this.props.userInfo.MatchName}
              </span>
              {/* <span className="match-backpack">
                <img src={Backpack} />
                <span>點擊背包！</span>
              </span> */}
              <span className="divide-line"></span>
              <span>
                年紀：{" "}
                {Math.floor(
                  Math.abs(new Date() - this.props.auth.createdAt) /
                    1000 /
                    86400
                )}{" "}
                天
              </span>
              <p> 想對主人說： </p>
              <span className="weekly-suggestion">
                {this.props.description}
              </span>
            </div>
            <div className="backgroud">
              <img src={this.props.LastIMG} className="match-in-background" />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <div className="matchstatus-main">
            <div className="match-status">
              <span className="match-name">
                {" "}
                {this.props.userInfo.MatchName}
              </span>
              {/* <span className="match-backpack">
              <img src={Backpack} />
              <span>點擊背包！</span>
            </span> */}
              <span className="divide-line"></span>
              <span>
                年紀：{" "}
                {Math.floor(
                  Math.abs(new Date() - this.props.auth.createdAt) /
                    1000 /
                    86400
                )}{" "}
                天
              </span>
              <p>
                {" "}
                想對主人說：
                <span className="weekly-suggestion">
                  這週還沒有飲食紀錄喔～快去新增今天吃了什麼吧！
                </span>
              </p>
            </div>
            <div className="backgroud">
              <img
                src={this.props.userInfo.MatchCharacterIMG}
                className="match-in-background"
              />
            </div>
          </div>
        </div>
      );
    }
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
    },
    removeIMGandDescription: () => {
      dispatch(removeIMGandDescription());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MatchStatus);
