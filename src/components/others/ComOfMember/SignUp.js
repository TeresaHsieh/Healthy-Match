import React from "react";
import { connect } from "react-redux";
import { signUp } from "../../../store/actions/authAction";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      name: ""
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
    return (
      <div className="sign-up">
        <div className="user-name">
          <span>姓名：</span>
          <input
            placeholder="輸入姓名"
            id="name"
            onChange={this.handleChange}
          ></input>
        </div>
        <div className="user-email">
          <span>信箱：</span>
          <input
            placeholder="輸入信箱"
            type="email"
            id="email"
            onChange={this.handleChange}
          ></input>
        </div>
        {/* <div className="user-sexual">
          <span>性別：</span>
          <input type="radio" name="gender" value="male" />
          男生
          <input type="radio" name="gender" value="female" />
          女生
        </div>
        <div className="user-tall">
          <span>身高：</span>
          <input
            placeholder="單位：公分"
            id="email"
            onChange={this.handleChange}
          />
        </div>
        <div className="user-weight">
          <span>體重：</span>
          <input
            placeholder="單位：公斤"
            id="email"
            onChange={this.handleChange}
          />
        </div> */}
        <div className="user-password">
          <span>密碼：</span>
          <input
            placeholder="輸入密碼"
            type="password"
            id="password"
            onChange={this.handleChange}
          />
        </div>
        <div className="user-password">
          <span>確認密碼：</span>
          <input
            placeholder="確認密碼"
            type="password"
            id="passwordCheck"
            onChange={this.handleChange}
          />
        </div>
        <button className="register" onClick={this.handleSubmit}>
          確認註冊！
        </button>
      </div>
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
