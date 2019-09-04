import React from "react";
import "../../css/member.css";
import { Route, NavLink, Redirect } from "react-router-dom";

// App Components
import Header from "../common/Header";
import SignUp from "../others/ComOfMember/SignUp";
import LogIn from "../others/ComOfMember/LogIn";
import LogOut from "../others/ComOfMember/LogOut";

const Member = () => (
  <div className="lightbox">
    <Header />
    <div className="main-member">
      <div>
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
        {/* <LogOut /> */}
      </div>
    </div>
  </div>
);

export default Member;
