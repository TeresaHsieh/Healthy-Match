import React from "react";
import "../../../css/history.css";

class DateSearch extends React.Component {
  // filterDatesRange=(e)=>{
  //   e.preventDefault();

  // }

  render() {
    return (
      <div className="date-picker">
        <p className="start-date">日期起點：</p>
        <input className="start-date-input" placeholder="yyyymmdd"></input>
        <p className="end-date">日期終點：</p>
        <input className="end-date-input" placeholder="yyyymmdd"></input>
        <button
          className="date-submit"
          type="submit"
          value="篩選日期"
          onClick={this.filterDatesRange}
        >
          篩選日期！
        </button>
      </div>
    );
  }
}

export default DateSearch;
