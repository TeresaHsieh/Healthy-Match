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

  render() {
    return <div className="date-picker"></div>;
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
