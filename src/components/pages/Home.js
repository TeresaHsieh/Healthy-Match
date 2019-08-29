import React from "react";
import "../../css/home.css";

// App Components
import Header from "../common/Header";
import MainMatch from "../../imgs/main-match.png";
import Marquee from "../common/Marquee";

const Home = () => (
  <div>
    <Header />
    <div className="home-main">
      <div className="home-intro">
        <h1> Healthy Match </h1>
        <h3> 你的營養紀錄小幫手！ </h3>
        <p> 飲食紀錄 ｜ 營養統計 ｜ 麻吉養成 </p>
        <button className="start-button">
          <span>開始我的紀錄！</span>
        </button>
      </div>
      <img src={MainMatch} className="main-match" />
    </div>
  </div>
);

export default Home;
