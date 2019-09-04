import React from "react";

class SignUp extends React.Component {
  render() {
    return (
      <div className="sign-up">
        <div className="user-name">
          <span>姓名：</span>
          <input placeholder="輸入姓名"></input>
        </div>
        <div className="user-email">
          <span>信箱：</span>
          <input placeholder="輸入信箱"></input>
        </div>
        <div className="user-sexual">
          <span>性別：</span>
          <input type="radio" name="gender" value="male" />
          男生
          <input type="radio" name="gender" value="female" />
          女生
        </div>
        <div className="user-tall">
          <span>身高：</span>
          <input placeholder="單位：公分" />
        </div>
        <div className="user-weight">
          <span>體重：</span>
          <input placeholder="單位：公斤" />
        </div>
        <div className="user-code">
          <span>密碼：</span>
          <input />
        </div>
        <div className="user-code">
          <span>確認密碼：</span>
          <input />
        </div>
        <button className="register">確認註冊！</button>
      </div>
    );
  }
}

export default SignUp;
