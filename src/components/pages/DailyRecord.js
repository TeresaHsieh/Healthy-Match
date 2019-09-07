import React from "react";
import "../../css/dailyRecord.css";
import { Route, NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { checkFirestoreRecord } from "../../store/actions/dailyAction";

// App Components
import Header from "../common/Header";
import MainForm from "../others/ComOfDailyRecord/MainForm";
import ChefMatch from "../../imgs/chef-match.png";

class DailyRecord extends React.Component {
  checkFirestoreRecord = () => {
    console.log("123");
    this.props.checkFirestoreRecord();
  };

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
              <NavLink
                to="/daily-record/breakfast"
                onClick={this.checkFirestoreRecord}
              >
                早餐
              </NavLink>
              <NavLink
                to="/daily-record/lunch"
                onClick={this.checkFirestoreRecord}
              >
                午餐
              </NavLink>
              <NavLink
                to="/daily-record/dinner"
                onClick={this.checkFirestoreRecord}
              >
                晚餐
              </NavLink>
              <NavLink
                to="/daily-record/snack"
                onClick={this.checkFirestoreRecord}
              >
                點心
              </NavLink>
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

const mapStateToProps = state => {
  return {
    date: new Date().toLocaleDateString(),
    meals: state.daily.meals,
    record: state.daily.record,
    recordName: state.daily.recordName,
    recordServe: state.daily.recordServe
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // check firestore record when enter the different category page
    checkFirestoreRecord: () => {
      dispatch(checkFirestoreRecord());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DailyRecord);
