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
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(History);
