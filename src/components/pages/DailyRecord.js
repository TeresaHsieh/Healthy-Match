import React from "react";
import "../../css/dailyRecord.css";
import { Route, NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// App Components
import Header from "../common/Header";

import MainForm from "../others/ComOfDailyRecord/MainForm";
import NutritionChart from "../others/ComOfDailyRecord/NutritionChart";
import ChefMatch from "../../imgs/chef-match.png";
import Information from "../../imgs/information.png";
import Marquee from "../common/Marquee";
import thinking from "../../imgs/thinking.png";

class DailyRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openInfo: false
    };
  }

  componentDidMount = () => {
    gtag("config", "G-ZE61GMZD8R", {
      page_title: "dailyrecordbreak",
      page_path: "/daily-record-break"
    });
  };

  openInfoTips = () => {
    this.setState({ openInfo: true });
  };

  closeInfoTips = () => {
    this.setState({ openInfo: false });
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="./member" />;

    const openInfo = this.state.openInfo;

    return (
      <div>
        <Header />

        <div className="dailyrecord-main">
          <img src={ChefMatch} className="chef-match" />

          <div className="meals">
            <div className="meals-nav">
              <NavLink to="/daily-record/breakfast">早餐</NavLink>
              <NavLink to="/daily-record/lunch">午餐</NavLink>
              <NavLink to="/daily-record/dinner">晚餐</NavLink>
              <span className="nutritionCountTips" onClick={this.openInfoTips}>
                營養份數 100g 怎麼算？
              </span>
              <img
                src={Information}
                className="informationIcon"
                onClick={this.openInfoTips}
              ></img>
            </div>

            {openInfo ? (
              <div className="closeInfoDiv" onClick={this.closeInfoTips}>
                {" "}
                <NutritionChart />{" "}
              </div>
            ) : (
              ""
            )}

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
