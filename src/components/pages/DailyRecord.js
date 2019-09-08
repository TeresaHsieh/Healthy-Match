import React from "react";
import "../../css/dailyRecord.css";
import { Route, NavLink, Redirect } from "react-router-dom";

// App Components
import Header from "../common/Header";
import MainForm from "../others/ComOfDailyRecord/MainForm";
import ChefMatch from "../../imgs/chef-match.png";

class DailyRecord extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="dailyrecord-main">
          <div className="hello-intro">
            {/* <h2> 書庭早安～歡迎回來！ </h2> */}
            <img src={ChefMatch} className="chef-match" />
          </div>
          <div className="meals">
            <div className="meals-nav">
              <NavLink to="/daily-record/breakfast">早餐</NavLink>
              <NavLink to="/daily-record/lunch">午餐</NavLink>
              <NavLink to="/daily-record/dinner">晚餐</NavLink>
              <NavLink to="/daily-record/snack">點心</NavLink>
            </div>
            <Route
              exact
              path="/daily-record"
              render={() => <Redirect to="/daily-record/breakfast" />}
            />
            <Route path="/daily-record/breakfast" component={MainForm} />
            <Route path="/daily-record/lunch" component={MainForm} />
            <Route path="/daily-record/dinner" component={MainForm} />
            <Route path="/daily-record/snack" component={MainForm} />
          </div>
        </div>
      </div>
    );
  }
}

export default DailyRecord;
