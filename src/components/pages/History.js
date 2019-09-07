import React from "react";
import ProteinChart from "../others/ComOfHistory/ProteinChart";

// App Components
import Header from "../common/Header";

class History extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h2> History </h2>
        <ProteinChart />
      </div>
    );
  }
}

export default History;
