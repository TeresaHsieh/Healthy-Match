import React from "react";
import "../../css/member.css";
import { Route, NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// App Components
import Header from "../common/Header";
import SignUp from "../others/ComOfMember/SignUp";
import LogIn from "../others/ComOfMember/LogIn";

class Member extends React.Component {
  render() {
    const { auth } = this.props;
    //if (auth.uid) return <Redirect to="./" />;
    return (
      <div className="lightbox">
        <Header />
        <div className="main-member">
          <div className="sign-up-log-in">
            <NavLink to="/member/log-in">登入</NavLink>
            <NavLink to="/member/sign-up">註冊</NavLink>
            <Route
              exact
              path="/member"
              render={() => <Redirect to="/member/log-in" />}
            />
            <Route path="/member/log-in" component={LogIn} />
            <Route path="/member/sign-up" component={SignUp} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    date: new Date().toLocaleDateString(),
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Member);
