import React from "react";
import { connect } from "react-redux";
import { signIn } from "../../../store/actions/authAction";
import { firebase } from "firebase";
import { Redirect } from "react-router-dom";
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

  render() {
    if (this.props.auth.uid) {
      return <Redirect to="/daily-record" />;
    }
    const { authError } = this.props;
    return (
      <div className="log-in">
        {/* <span>信箱：</span> */}
        <input
          type="email"
          id="email"
          onChange={this.handleChange}
          placeholder="信箱"
          className="log-in-user-email"
        ></input>

        {/* <span>密碼：</span> */}
        <input
          type="password"
          id="password"
          onChange={this.handleChange}
          placeholder="密碼"
          className="log-in-user-password"
        ></input>

        <button className="login-button" onClick={this.handleSubmit}>
          登入
        </button>
        <div className="warning">{authError ? <p>{authError}</p> : null}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
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
