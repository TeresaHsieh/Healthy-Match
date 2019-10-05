// All imports
import React, { createRef, useRef } from "react";
import { connect } from "react-redux";

// App Components, Actions and CSS
import { makeSelectedDatesToProps } from "../../../store/actions/dailyAction";
import { checkFirestoreNutritionRecord } from "../../../store/actions/dailyAction";
import { changePropsStartDate } from "../../../store/actions/dailyAction";
import { changePropsEndDate } from "../../../store/actions/dailyAction";
import { usingFilterTimeFunction } from "../../../store/actions/dailyAction";
import Calendar from "../ComOfHistory/Calendar";
import "../../../css/history.css";

class DateSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startLargerThanEnd: false,
      openDatePicker: false
    };
    this.areaInsideDatePicker = React.createRef();
  }

  // changeStartDates = e => {
  //   let startDatesValue = e.target.value;
  //   this.props.changePropsStartDate(startDatesValue);
  // };

  // changeEndDates = e => {
  //   let endDatesValue = e.target.value;
  //   this.props.changePropsEndDate(endDatesValue);
  // };

  // filterDatesRange = e => {
  //   e.preventDefault();
  //   let startDate = Number(this.props.startDate);
  //   let endDate = Number(this.props.endDate);

  //   if (startDate > endDate) {
  //     this.setState({ startLargerThanEnd: true });
  //   } else {
  //     this.setState({ startLargerThanEnd: false });
  //   }
  //   let userUID = this.props.auth.uid;
  //   this.props.checkFirestoreNutritionRecord(startDate, endDate, userUID);
  //   this.props.usingFilterTimeFunction();
  // };

  render() {
    // const startLargerThanEnd = this.state.startLargerThanEnd;
    // let warning;

    // if (startLargerThanEnd) {
    //   warning = <p className="warning"> 終點日期不得小於起點日期喔！</p>;
    // }

    return (
      // <div className="date-picker">
      //   <p className="start-date">日期起點：</p>
      //   <input
      //     id="start-date-input"
      //     className="start-date-input"
      //     type="date"
      //     placeholder={this.props.startDate}
      //     onChange={this.changeStartDates}
      //   ></input>
      //   <p className="end-date">日期終點：</p>
      //   <input
      //     id="end-date-input"
      //     className="end-date-input"
      //     placeholder={this.props.endDate}
      //     onChange={this.changeEndDates}
      //   ></input>
      //   <button
      //     className="date-submit"
      //     type="submit"
      //     value="篩選日期"
      //     onClick={this.filterDatesRange}
      //   >
      //     篩選日期！
      //   </button>
      //   {warning}
      //   <Calendar />
      // </div>
      <div className="date-picker"></div>
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
)(DateSearch);
