import React from "react";
import "../../css/home.css";
import { connect } from "react-redux";

// App Components
import Header from "../common/Header";
import MainMatch from "../../imgs/main-match.png";
import Marquee from "../common/Marquee";

class Home extends React.Component {
  startToUse = () => {
    // <Redirect to="./daily-record" />;
    let path = "./daily-record";
    this.props.history.push(path);
  };

  componentDidMount = () => {
    gtag("config", "G-ZE61GMZD8R", {
      page_title: "home",
      page_path: "/home"
    });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="home-main">
          <div className="home-intro">
            <h1> Healthy Match </h1>
            <h3> 你的營養紀錄小幫手！ </h3>
            <p> 飲食紀錄 ｜ 營養統計 ｜ 麻吉養成 </p>
            <button className="start-button" onClick={this.startToUse}>
              <span>開始我的紀錄！</span>
            </button>
          </div>
          <img src={MainMatch} className="main-match" />
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

export default connect(mapStateToProps)(Home);
