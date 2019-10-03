// All imports
import React from "react";
import { Route, NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// App Components and CSS
import Header from "../common/Header";
import SignUp from "../others/ComOfMember/SignUp";
import LogIn from "../others/ComOfMember/LogIn";
import basketMatch from "../../imgs/basket-match.png";
import "../../css/member.css";

class Member extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="main-member">
          <div className="left-main-member">
            <div>
              <img src={basketMatch} className="basket-match" />
              <div className="container">
                <div className="flip">
                  <div>
                    <div>GOOD MORNING</div>
                  </div>
                  <div>
                    <div>GOOD AFTERNOON</div>
                  </div>
                  <div>
                    <div>GOOD EVENING</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right-main-member">
            <div className="main-member-nav">
              <NavLink to="/member/log-in">登入</NavLink>
              <NavLink to="/member/sign-up">註冊</NavLink>
            </div>
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
