import React from "react";
import "../../css/status.css";

// App Components
import Header from "../common/Header";
import MainMatch from "../../imgs/main-match.png";
import Happy from "../../imgs/happy.png";
import Unhappy from "../../imgs/unhappy.png";
import Backpack from "../../imgs/backpack.png";

const MatchStatus = () => (
  <div>
    <Header />
    <div className="matchstatus-main">
      <div className="match-status">
        <span className="match-name"> 花生</span>
        <span className="divide-line"></span>
        <span className="match-mood">
          <span>心情值：</span>
          <img src={Happy} />
          <img src={Happy} />
          <img src={Happy} />
          <img src={Unhappy} />
          <img src={Unhappy} />
        </span>
        <span className="match-healthy">
          <span>健康值：</span>
          <img src={Happy} />
          <img src={Happy} />
          <img src={Happy} />
          <img src={Unhappy} />
          <img src={Unhappy} />
        </span>
        <span>年紀：10 天</span>
        <span>想對主人說：我真的好餓</span>
        <span className="match-backpack">
          <img src={Backpack} />
          <span>點擊背包！</span>
        </span>
      </div>
      <div className="backgroud">
        <img src={MainMatch} className="match-in-background" />
      </div>
    </div>
  </div>
);

export default MatchStatus;
