import React from "react";

// App Components
import ByeMatch from "../../../imgs/bye-match.gif";

class LogOut extends React.Component {
  render() {
    return (
      <div className="log-out">
        <img src={ByeMatch} className="bye-match" />
        <p>確定登出嗎～？</p>
        <div className="exit-buttons">
          <button>我先走囉！</button>
          <button>再玩耍一下</button>
        </div>
      </div>
    );
  }
}

export default LogOut;
