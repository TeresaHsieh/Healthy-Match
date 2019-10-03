// All imports
import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { firebase } from "firebase";

// App Components, Actions and CSS
import { signIn } from "../../../store/actions/authAction";
import "../../../css/member.css";

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  setTestAccountToInput = e => {
    e.preventDefault();
    this.setState(
      { email: "HealthyMatchTest@gmail.com", password: "HealthyMatchTest" },
      () => {
        this.props.signIn(this.state);
      }
    );
  };

  render() {
    if (this.props.auth.uid) {
      return <Redirect to="/daily-record" />;
    }

    const { loginError } = this.props;
    let loginErrorMessage;
    switch (loginError) {
      case "There is no user record corresponding to this identifier. The user may have been deleted.":
        loginErrorMessage = "此帳戶不存在喔！";
        break;
      case "The password is invalid or the user does not have a password.":
        loginErrorMessage = "密碼錯誤 > <";
        break;
      case "The email address is badly formatted.":
        loginErrorMessage = "信箱格式錯誤";
        break;
    }

    return (
      <div className="log-in">
        <div>
          <p>信箱</p>
          <input
            type="email"
            id="email"
            onChange={this.handleChange}
            placeholder="請輸入信箱"
          ></input>
        </div>
        <div>
          <p>密碼</p>
          <input
            type="password"
            id="password"
            onChange={this.handleChange}
            placeholder="請輸入密碼"
          ></input>
        </div>
        {loginError ? (
          <p className="login-warning">{loginErrorMessage}</p>
        ) : null}

        <button className="login-button" onClick={this.handleSubmit}>
          <span>登入</span>
        </button>
        <button
          className="test-login-button"
          onClick={this.setTestAccountToInput}
        >
          <span>使用測試帳密登入</span>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    loginError: state.auth.loginError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);
