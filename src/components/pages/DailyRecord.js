import React from "react";
import "../../css/dailyRecord.css";
import { Route, NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// App Components
import Header from "../common/Header";
import MainForm from "../others/ComOfDailyRecord/MainForm";
import ChefMatch from "../../imgs/chef-match.png";
import Marquee from "../common/Marquee";
import thinking from "../../imgs/thinking.png";

class DailyRecord extends React.Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="./member" />;

    return (
      <div>
        <Header />

        <div className="dailyrecord-main">
          <div className="hello-intro">
            {/* <h2> 書庭早安～歡迎回來！ </h2> */}
            {/* <Marquee /> */}
            <img src={ChefMatch} className="chef-match" />
          </div>

          <div className="meals">
            <div className="meals-nav">
              <NavLink to="/daily-record/breakfast">早餐</NavLink>
              <NavLink to="/daily-record/lunch">午餐</NavLink>
              <NavLink to="/daily-record/dinner">晚餐</NavLink>
            </div>
            <Route
              exact
              path="/daily-record"
              render={() => <Redirect to="/daily-record/breakfast" />}
            />
            <Route path="/daily-record/breakfast" component={MainForm} />
            <Route path="/daily-record/lunch" component={MainForm} />
            <Route path="/daily-record/dinner" component={MainForm} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    date: new Date().toLocaleDateString(),
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(DailyRecord);
