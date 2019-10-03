import React from "react";
import DatePicker from "../others/ComOfHistory/DatePicker";
import ProteinChart from "../others/ComOfHistory/ProteinChart";
import FatChart from "../others/ComOfHistory/FatChart";
import CarbohydrateChart from "../others/ComOfHistory/CarbohydrateChart";
import VitaminChart from "../others/ComOfHistory/VitaminChart";
import MineralChart from "../others/ComOfHistory/MineralChart";
import ChefMatch from "../../imgs/chef-match.png";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "../../css/history.css";

// App Components
import Header from "../common/Header";

class History extends React.Component {
  // componentDidMount = () => {
  //   // let userWeight = this.props.userInfo.Weight;
  //   // if (userWeight == undefined || userWeight == null || isNaN(userWeight)) {
  //   //   alert("尚未輸入體重，這樣會無法給予部分營養素建議喔～");
  //   // }
  //   console.log("輿論壓力");
  // };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="./member" />;
    return (
      <div>
        <Header />
        <DatePicker />
        <ProteinChart />
        <FatChart />
        <CarbohydrateChart />
        <VitaminChart />
        <MineralChart />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    date: new Date().toLocaleDateString(),
    auth: state.firebase.auth,
    userInfo: state.firebase.profile
  };
};

export default connect(mapStateToProps)(History);
