// All imports
import React, { createRef, useRef } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom";

// App Components, Actions and CSS
import girlMatch from "../../../imgs/girlMatch.png";
import boyMatch from "../../../imgs/boyMatch.png";
import { signUp } from "../../../store/actions/authAction";
import "../../../css/member.css";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      matchGender: "boyMatch",
      signUpDate: "",
      passwordNotSameError: false,
      nameDidNotFilledError: false,
      emailDidNotFilledError: false,
      passwordDidNotFilledError: false
    };
    this.password = React.createRef();
    this.passwordCheck = React.createRef();
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.state.name.trim() == ""
      ? this.setState({ nameDidNotFilledError: true })
      : this.setState({ nameDidNotFilledError: false });

    this.state.email.trim() == ""
      ? this.setState({ emailDidNotFilledError: true })
      : this.setState({ emailDidNotFilledError: false });
    this.state.password.trim() == ""
      ? this.setState({ passwordDidNotFilledError: true })
      : this.setState({ passwordDidNotFilledError: false });
    this.password.current.value != this.passwordCheck.current.value
      ? this.setState({ passwordNotSameError: true })
      : this.setState({ passwordNotSameError: false });

    if (
      this.state.nameDidNotFilledError == false &&
      this.state.emailDidNotFilledError == false &&
      this.state.passwordNotSameError == false &&
      this.state.passwordDidNotFilledError == false
    ) {
      this.props.signUp(this.state);
    }
  };

  render() {
    if (this.props.auth.uid) {
      return <Redirect to="/info" />;
    }

    const {
      passwordNotSameError,
      nameDidNotFilledError,
      emailDidNotFilledError,
      passwordDidNotFilledError
    } = this.state;

    const { signupError } = this.props;
    let signupErrorMessage;
    switch (signupError) {
      case "The email address is badly formatted.":
        signupErrorMessage = "信箱格式錯誤";
        break;
    }

    return (
      <div className="sign-up">
        <form>
          <div>
            <p>姓名</p>
            <input
              placeholder="請輸入姓名"
              id="name"
              onChange={this.handleChange}
            />
            {nameDidNotFilledError ? (
              <p className="name-did-not-filled-error">請填寫姓名</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <p>信箱</p>
            <input
              placeholder="請輸入信箱"
              type="email"
              id="email"
              onChange={this.handleChange}
            />
            {emailDidNotFilledError ? (
              <p className="email-did-not-filled-error">請填寫信箱</p>
            ) : (
              ""
            )}
            {signupError ? (
              <p className="email-bad-format-error">{signupErrorMessage}</p>
            ) : null}
          </div>
          <div>
            <p>密碼</p>
            <input
              placeholder="請輸入密碼（密碼建議長度為 6 碼以上）"
              type="password"
              id="password"
              onChange={this.handleChange}
              ref={this.password}
            />
            {passwordDidNotFilledError ? (
              <p className="password-did-not-filled-error">請填寫密碼</p>
            ) : (
              ""
            )}
            {passwordNotSameError ? (
              <p className="password-not-same-error">
                「密碼」請與「確認密碼」一樣
              </p>
            ) : (
              ""
            )}
          </div>
          <div>
            <p>確認密碼</p>
            <input
              placeholder="請確認密碼（密碼建議長度為 6 碼以上）"
              type="password"
              id="passwordCheck"
              onChange={this.handleChange}
              ref={this.passwordCheck}
            />
            {passwordNotSameError ? (
              <p className="password-not-same-error">
                「密碼」請與「確認密碼」一樣
              </p>
            ) : (
              ""
            )}
          </div>
          <div>
            <p>選擇一隻麻吉</p>
            <div className="boymatch">
              <input
                type="radio"
                id="matchGender"
                value="boyMatch"
                onChange={this.handleChange}
                className="boymatchInput"
                name="matchGender"
                defaultChecked
              />
              <span>活潑麻糬</span>
              <img src={`/${boyMatch}`} className="boyMatch" />
            </div>
            <div className="girlmatch">
              <input
                type="radio"
                id="matchGender"
                value="girlMatch"
                onChange={this.handleChange}
                className="girlmatchInput"
                name="matchGender"
              />
              <span>氣質麻糬</span>
              <img src={`/${girlMatch}`} className="girlMatch" />
            </div>
          </div>
          <button className="register-button" onClick={this.handleSubmit}>
            <span>確認註冊！</span>
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    signupError: state.auth.signupError
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
