import React from "react";
import "../../../css/dailyRecord.css";
import halffist from "../../../imgs/halffist.png";
import halfpalm from "../../../imgs/halfpalm.png";
import leftwholepalm from "../../../imgs/leftwholepalm.png";
import onefinger from "../../../imgs/onefinger.png";

import wholepalm from "../../../imgs/wholepalm.png";

class NutritionChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <div className="nutritionInfo">
          <div className="nutritionInfoDetails">
            <div className="teaching">營養計算小學堂</div>
            <div className="allInformation">
              <div className="categoryTitle">
                <span>全穀雜糧類</span>
                <span>蛋豆魚肉類</span>
                <span>乳品類</span>
                <span>油脂類</span>
                <span>堅果種子類</span>
                <span>蔬菜類</span>
                <span>水果類</span>
              </div>
              <div className="categoryServe">
                <span>100g 約為半個拳頭</span>
                <span>100g 約為一個手心</span>
                <span>100g 約為兩個手心</span>
                <span>100g 約為一個指頭</span>
                <span>100g 約為一個手心</span>
                <span>100g 約為兩個手心</span>
                <span>100g 約為兩個手心</span>
              </div>
              <div className="categoryServeIMG">
                <div>
                  <img src={`/${halffist}`} className="halffist" />
                </div>
                <div>
                  <img src={`/${wholepalm}`} className="wholepalm" />
                </div>
                <div>
                  <img src={`/${leftwholepalm}`} className="leftwholepalm" />
                  <img src={`/${wholepalm}`} className="wholepalm" />
                </div>
                <div>
                  <img src={`/${onefinger}`} className="onefinger" />
                </div>
                <div>
                  <img src={`/${halfpalm}`} className="halfpalm" />
                </div>
                <div>
                  <img src={`/${leftwholepalm}`} className="leftwholepalm" />
                  <img src={`/${wholepalm}`} className="wholepalm" />
                </div>
                <div>
                  <img src={`/${leftwholepalm}`} className="leftwholepalm" />
                  <img src={`/${wholepalm}`} className="wholepalm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NutritionChart;
