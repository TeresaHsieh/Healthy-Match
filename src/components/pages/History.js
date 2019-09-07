import React from "react";
import BarChart from "../others/ComOfHistory/test";

// App Components
import Header from "../common/Header";

class History extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h2> History </h2>
        <BarChart />
      </div>
    );
  }
}

export default History;
