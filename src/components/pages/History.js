// All imports
import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

// App Components, Actions and CSS
import Header from "../common/Header";
import Calendar from "../../components/others/ComOfHistory/Calendar";
import ProteinChart from "../others/ComOfHistory/ProteinChart";
import FatChart from "../others/ComOfHistory/FatChart";
import CarbohydrateChart from "../others/ComOfHistory/CarbohydrateChart";
import VitaminChart from "../others/ComOfHistory/VitaminChart";
import MineralChart from "../others/ComOfHistory/MineralChart";
import { makeSelectedDatesToProps } from "../../store/actions/dailyAction";
import { checkFirestoreNutritionRecord } from "../../store/actions/dailyAction";
import { changePropsStartDate } from "../../store/actions/dailyAction";
import { changePropsEndDate } from "../../store/actions/dailyAction";
import { usingFilterTimeFunction } from "../../store/actions/dailyAction";
import To from "../../imgs/to.png";
import "../../css/history.css";

class History extends React.Component {
  constructor() {
    super();
    this.state = {
      startLargerThanEnd: false,
      openDatePicker: false
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

    this.props.makeSelectedDatesToProps(startDate, endDate);

    let userUID = this.props.auth.uid;
    if (userUID) {
      this.props.checkFirestoreNutritionRecord(startDate, endDate, userUID);
    }
  };

  openDatePicker = () => {
    this.setState({ openDatePicker: true });
  };

  closeDatePicker = e => {
    if (e.target.className === "calendar-background-div") {
      this.setState({ openDatePicker: false });
    }
  };

  filterDatesRange = e => {
    e.preventDefault();
    let startDate = Number(this.props.startDate);
    let endDate = Number(this.props.endDate);

    let userUID = this.props.auth.uid;
    this.props.checkFirestoreNutritionRecord(startDate, endDate, userUID);
    this.props.usingFilterTimeFunction();
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="./member" />;

    const openDatePicker = this.state.openDatePicker;

    const { startDate } = this.props;
    const { endDate } = this.props;

    // startDate.splice();

    return (
      <div>
        <Header />
        <div className="date-filter-div">
          <input
            className="date-range-input"
            onFocus={this.openDatePicker}
            value={`${this.props.startDate} ➜ ${this.props.endDate}`}
          ></input>
          <button
            className="date-filter-button"
            type="submit"
            value="篩選日期"
            onClick={this.filterDatesRange}
          >
            <span>篩選日期</span>
          </button>
        </div>
        {openDatePicker ? (
          <div
            className="calendar-background-div"
            ref={this.areaInsideDatePicker}
            onClick={this.closeDatePicker}
          >
            <Calendar />
          </div>
        ) : null}
        <div>
          <p className="nutrition-title">蛋白質攝取紀錄</p>
          <ProteinChart />
        </div>

        <div>
          <p className="nutrition-title">脂肪攝取紀錄</p>
          <FatChart />
        </div>

        <div>
          <p className="nutrition-title">碳水化合物攝取紀錄</p>
          <CarbohydrateChart />
        </div>

        <div>
          {" "}
          <p className="nutrition-title">
            維他命（B1、B2、B6、B12、C、E）攝取紀錄
          </p>
          <VitaminChart />
        </div>

        <div>
          {" "}
          <p className="nutrition-title">
            礦物質（磷、鈉、鈣、鉀、鋅、鎂、鐵）攝取紀錄
          </p>
          <MineralChart />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    date: new Date().toLocaleDateString(),
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
    makeSelectedDatesToProps: (startDate, endDate) => {
      dispatch(makeSelectedDatesToProps(startDate, endDate));
    },
    checkFirestoreNutritionRecord: (startDate, endDate, userUID) => {
      dispatch(checkFirestoreNutritionRecord(startDate, endDate, userUID));
    },
    changePropsStartDate: startDatesValue => {
      dispatch(changePropsStartDate(startDatesValue));
    },
    changePropsEndDate: endDatesValue => {
      dispatch(changePropsEndDate(endDatesValue));
    },
    usingFilterTimeFunction: () => {
      dispatch(usingFilterTimeFunction());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
