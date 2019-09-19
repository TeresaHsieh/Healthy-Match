import React from "react";
import "../../../css/history.css";

class DateSearch extends React.Component {
  render() {
    return (
      <div className="date-picker">
        <p className="start-date">日期起點：</p>
        <input className="start-date-input"></input>
        <p className="end-date">日期終點：</p>
        <input className="end-date-input"></input>
        <button className="date-submit" type="submit" value="篩選日期">
          篩選日期！
        </button>
      </div>
    );
  }
}

export default DateSearch;
