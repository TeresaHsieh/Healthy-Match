import React from "react";
import { connect } from "react-redux";
import { signUp } from "../../../store/actions/authAction";
import { Redirect } from "react-router-dom";
import "../../../css/member.css";
import girlMatch from "../../../imgs/girlMatch.png";
import boyMatch from "../../../imgs/boyMatch.png";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      matchGender: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp(this.state);
  };
  render() {
    const { auth } = this.props;
    //if (auth.uid) return <Redirect to="./" />;

    return (
      <form className="sign-up">
        <div className="sign-up-user-name">
          <span>姓名：</span>
          <input
            placeholder="輸入姓名"
            id="name"
            onChange={this.handleChange}
          ></input>
        </div>
        <div className="sign-up-user-email">
          <span>信箱：</span>
          <input
            placeholder="輸入信箱"
            type="email"
            id="email"
            onChange={this.handleChange}
          ></input>
        </div>
        {/* <div className="sign-up-user-sexual">
          <span>性別：</span>
          <input type="radio" name="gender" value="male" />
          男生
          <input type="radio" name="gender" value="female" />
          女生
        </div>
        <div className="sign-up-user-tall">
          <span>身高：</span>
          <input
            placeholder="單位：公分"
            id="email"
            onChange={this.handleChange}
          />
        </div>
        <div className="sign-up-user-weight">
          <span>體重：</span>
          <input
            placeholder="單位：公斤"
            id="email"
            onChange={this.handleChange}
          />
        </div> */}
        <div className="sign-up-user-password">
          <span>密碼：</span>
          <input
            placeholder="輸入密碼"
            type="password"
            id="password"
            onChange={this.handleChange}
          />
        </div>
        <div className="sign-up-user-checked-password">
          <span>確認密碼：</span>
          <input
            placeholder="確認密碼"
            type="password"
            id="passwordCheck"
            onChange={this.handleChange}
          />
        </div>
        <div className="sign-up-matchSelect">
          <p>挑選麻吉：</p>
          <input
            type="radio"
            id="matchGender"
            value="boyMatch"
            onChange={this.handleChange}
          />
          <span>活潑麻糬</span>
          <img src={`/${boyMatch}`} className="boyMatch" />
          <input
            type="radio"
            id="matchGender"
            value="girlMatch"
            onChange={this.handleChange}
          />
          <span>氣質麻糬</span>
          <img src={`/${girlMatch}`} className="girlMatch" />
        </div>
        <button className="register" onClick={this.handleSubmit}>
          確認註冊！
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
