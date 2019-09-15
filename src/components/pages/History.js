import React from "react";
import ProteinChart from "../others/ComOfHistory/ProteinChart";
import Calendar from "../others/ComOfHistory/Calendar";

// App Components
import Header from "../common/Header";

class History extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h2> 圖表 </h2>
        <Calendar />
        <ProteinChart />
      </div>
    );
  }
}

export default History;
