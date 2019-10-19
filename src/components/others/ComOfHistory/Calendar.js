// All imports
import React, { createRef, useRef } from "react";
import { connect } from "react-redux";

// App Components, Actions and CSS
import { changePropsStartDate } from "../../../store/actions/dailyAction";
import { changePropsEndDate } from "../../../store/actions/dailyAction";
import "../../../css/calendar.css";

let moment = require("moment");
moment().format();

const Heading = ({ date, changeMonth, resetDate }) => (
  <nav className="calendar--nav">
    <a onClick={() => changeMonth(date.month() - 1)}>&#8249;</a>
    <h1 onClick={() => resetDate()}>
      {date.format("MMMM")} <small>{date.format("YYYY")}</small>
    </h1>
    <a onClick={() => changeMonth(date.month() + 1)}>&#8250;</a>
  </nav>
);

const Day = ({ currentDate, date, startDate, endDate, onClick }) => {
  let className = [];

  if (moment().isSame(date, "day")) {
    className.push("active");
  }
  if (date.isSame(startDate, "day")) {
    className.push("start");
  }
  if (date.isBetween(startDate, endDate, "day")) {
    className.push("between");
  }
  if (date.isSame(endDate, "day")) {
    className.push("end");
  }
  if (!date.isSame(currentDate, "month")) {
    className.push("muted");
  }
  return (
    <span
      onClick={() => onClick(date)}
      currentDate={date}
      className={className.join(" ")}
    >
      {date.date()}
    </span>
  );
};

const Days = ({ date, startDate, endDate, onClick }) => {
  const thisDate = moment(date);
  const daysInMonth = moment(date).daysInMonth();
  const firstDayDate = moment(date).startOf("month");
  const previousMonth = moment(date).subtract(1, "month");
  const previousMonthDays = previousMonth.daysInMonth();
  const nextsMonth = moment(date).add(1, "month");
  let days = [];
  let labels = [];

  for (let i = 1; i <= 7; i++) {
    labels.push(
      <span className="label">
        {moment()
          .day(i)
          .format("ddd")}
      </span>
    );
  }

  for (let i = firstDayDate.day() + 7; i > 1; i--) {
    previousMonth.date(previousMonthDays - i + 2);

    days.push(
      <Day
        key={moment(previousMonth).format("DD MM YYYY")}
        onClick={date => onClick(date)}
        currentDate={date}
        date={moment(previousMonth)}
        startDate={startDate}
        endDate={endDate}
      />
    );
  }

  for (let i = 1; i <= daysInMonth; i++) {
    thisDate.date(i);

    days.push(
      <Day
        key={moment(thisDate).format("DD MM YYYY")}
        onClick={date => onClick(date)}
        currentDate={date}
        date={moment(thisDate)}
        startDate={startDate}
        endDate={endDate}
      />
    );
  }

  const daysCount = days.length;
  for (let i = 1; i <= 45 - daysCount; i++) {
    nextsMonth.date(i);
    days.push(
      <Day
        key={moment(nextsMonth).format("DD MM YYYY")}
        onClick={date => onClick(date)}
        currentDate={date}
        date={moment(nextsMonth)}
        startDate={startDate}
        endDate={endDate}
      />
    );
  }

  return (
    <nav className="calendar--days">
      {labels.concat()}
      {days.concat()}
    </nav>
  );
};

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      startDate: moment().subtract(3, "day"),
      endDate: moment().add(3, "day")
    };
  }

  componentDidUpdate = () => {
    //startDate
    let startDatesValue = this.state.startDate._d;
    let startYear = startDatesValue.getFullYear();
    let startMonth = startDatesValue.getMonth() + 1;
    let startDay = startDatesValue.getDate();
    // endDate
    let endDatesValue = this.state.endDate._d;
    let endYear = endDatesValue.getFullYear();
    let endMonth = endDatesValue.getMonth() + 1;
    let endDay = endDatesValue.getDate();

    let startYearString = startYear.toString();

    let startMonthString = "";
    if (startMonth < 10) {
      startMonthString = "0" + startMonth.toString();
    } else {
      startMonthString = startMonth.toString();
    }

    let startDayString = "";
    if (startDay < 10) {
      startDayString = "0" + startDay.toString();
    } else {
      startDayString = startDay.toString();
    }

    let endYearString = endYear.toString();

    let endMonthString = "";
    if (endMonth < 10) {
      endMonthString = "0" + endMonth.toString();
    } else {
      endMonthString = endMonth.toString();
    }

    let endDayString = "";
    if (endDay < 10) {
      endDayString = "0" + endDay.toString();
    } else {
      endDayString = endDay.toString();
    }

    let startDate = startYearString + startMonthString + startDayString;
    let endDate = endYearString + endMonthString + endDayString;

    this.props.changePropsStartDate(startDate);
    this.props.changePropsEndDate(endDate);
  };

  resetDate() {
    this.setState({
      date: moment()
    });
  }

  changeMonth(month) {
    const { date } = this.state;
    date.month(month);
    this.setState(date);
  }

  changeDate(date) {
    let { startDate, endDate } = this.state;
    if (
      startDate === null ||
      date.isBefore(startDate, "day") ||
      !startDate.isSame(endDate, "day")
    ) {
      startDate = moment(date);
      endDate = moment(date);
    } else if (date.isSame(startDate, "day") && date.isSame(endDate, "day")) {
      startDate = null;
      endDate = null;
    } else if (date.isAfter(startDate, "day")) {
      endDate = moment(date);
    }
    this.setState({
      startDate,
      endDate
    });
  }

  render() {
    const { date, startDate, endDate } = this.state;
    return (
      <div className="calendar">
        <Heading
          date={date}
          changeMonth={month => this.changeMonth(month)}
          resetDate={() => this.resetDate()}
        />
        <Days
          onClick={date => this.changeDate(date)}
          date={date}
          startDate={startDate}
          endDate={endDate}
        />
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
)(Calendar);
