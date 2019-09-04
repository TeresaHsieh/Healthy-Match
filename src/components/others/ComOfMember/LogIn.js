import React from "react";

class LogIn extends React.Component {
  render() {
    return (
      <div className="log-in">
        <div className="user-email">
          <span>信箱：</span>
          <input></input>
        </div>
        <div className="user-code">
          <span>密碼：</span>
          <input></input>
        </div>
        <button className="login-button">登入</button>
      </div>
    );
  }
}

export default LogIn;
