import React from "react";
import "../../../css/history.css";

import { connect } from "react-redux";
import { makeSelectedDatesToProps } from "../../../store/actions/dailyAction";
import { checkFirestoreNutritionRecord } from "../../../store/actions/dailyAction";
import { changePropsStartDate } from "../../../store/actions/dailyAction";
import { changePropsEndDate } from "../../../store/actions/dailyAction";

class DateSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      startLargerThanEnd: false
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

    console.log("今天", endDate);
    console.log("一週前", startDate);

    this.props.makeSelectedDatesToProps(startDate, endDate);

    let userUID = this.props.auth.uid;
    this.props.checkFirestoreNutritionRecord(startDate, endDate, userUID);
  };

  changeStartDates = e => {
    let startDatesValue = e.target.value;
    this.props.changePropsStartDate(startDatesValue);
  };

  changeEndDates = e => {
    let endDatesValue = e.target.value;
    this.props.changePropsEndDate(endDatesValue);
  };

  filterDatesRange = e => {
    e.preventDefault();
    let startDate = Number(this.props.startDate);
    let endDate = Number(this.props.endDate);

    if (startDate > endDate) {
      this.setState({ startLargerThanEnd: true });
    } else {
      this.setState({ startLargerThanEnd: false });
    }
    let userUID = this.props.auth.uid;
    this.props.checkFirestoreNutritionRecord(startDate, endDate, userUID);
  };

  render() {
    const startLargerThanEnd = this.state.startLargerThanEnd;
    let warning;

    if (startLargerThanEnd) {
      warning = <p className="warning"> 終點日期不得小於起點日期喔！</p>;
    }

    return (
      <div className="date-picker">
        <p className="start-date">日期起點：</p>
        <input
          id="start-date-input"
          className="start-date-input"
          placeholder={this.props.startDate}
          onChange={this.changeStartDates}
        ></input>
        <p className="end-date">日期終點：</p>
        <input
          id="end-date-input"
          className="end-date-input"
          placeholder={this.props.endDate}
          onChange={this.changeEndDates}
        ></input>
        <button
          className="date-submit"
          type="submit"
          value="篩選日期"
          onClick={this.filterDatesRange}
        >
          篩選日期！
        </button>
        {warning}
      </div>
    );
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
    endDate: state.daily.endDate
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateSearch);
