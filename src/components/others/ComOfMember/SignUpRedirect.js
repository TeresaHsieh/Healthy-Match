import React from "react";
import "../../../css/member.css";

import LoveMatch from "../../../imgs/love-match.png";

class SignUpRedirect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="signUpRedirectBoxDetails">
        <img src={LoveMatch} className="love-match" />
        <p>歡迎來到 Healthy Match！</p>
        <span>
          開始使用前，
          <br />
          請將基本資料填寫完畢，以利營養紀錄更準確喔！
          <br />
          也順便幫你的麻吉取個動聽的名字吧～～～
        </span>
      </div>
    );
  }
}

export default SignUpRedirect;
