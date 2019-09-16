import React from "react";
import { connect } from "react-redux";
import { signIn } from "../../../store/actions/authAction";
import { firebase } from "firebase";
// let firebaseui = require("firebaseui");
// let ui = new firebaseui.auth.AuthUI(firebase.auth());

class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  // = () => {
  //   let uiConfig = {
  //     signInFlow: "popup",
  //     signInOptions: [
  //       // Leave the lines as is for the providers you want to offer your users.
  //       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //       firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  //       firebase.auth.EmailAuthProvider.PROVIDER_ID
  //     ]
  //   };
  // };

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
    const { authError } = this.props;
    return (
      <div className="log-in">
        <div uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}></div>
        <div className="user-email">
          <span>信箱：</span>
          <input type="email" id="email" onChange={this.handleChange}></input>
        </div>
        <div className="user-password">
          <span>密碼：</span>
          <input
            type="password"
            id="password"
            onChange={this.handleChange}
          ></input>
        </div>
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
    authError: state.auth.authError
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
