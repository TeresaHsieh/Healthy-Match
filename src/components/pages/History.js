import React from "react";
import Calendar from "../others/ComOfHistory/Calendar";
import ProteinChart from "../others/ComOfHistory/ProteinChart";
import FatChart from "../others/ComOfHistory/FatChart";
import CarbohydrateChart from "../others/ComOfHistory/CarbohydrateChart";
import VitaminChart from "../others/ComOfHistory/VitaminChart";
import MineralChart from "../others/ComOfHistory/MineralChart";

// App Components
import Header from "../common/Header";

class History extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h2> 圖表 </h2>
        <Calendar />
        <div>蛋白質</div>
        <ProteinChart />
        <div>脂肪</div>
        <FatChart />
        <div>碳水化合物</div>
        <CarbohydrateChart />
        <div>維生素</div>
        <VitaminChart />
        <div>礦物質</div>
        <MineralChart />
      </div>
    );
  }
}

export default History;
