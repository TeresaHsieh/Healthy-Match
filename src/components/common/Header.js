import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";

// Components
import logo from "../../imgs/logo.png";

const Header = () => (
  <header className="header">
    <Link to="/">
      <img src={logo} className="logo" />
    </Link>
    <div className="main-nav">
      <NavLink to="/daily-record"> 每日記錄 </NavLink>
      <NavLink to="/history"> 營養歷史 </NavLink>
      <NavLink to="/match-status"> 麻吉樂園 </NavLink>
      <NavLink to="/news"> 健康新知 </NavLink>
      <NavLink to="/member"> 註冊/登入 </NavLink>
      <NavLink to="/log-out"> 登出 </NavLink>
    </div>
  </header>
);

const mapStateToProps = state => {
  console.log(state);
  return {};
};

export default connect(mapStateToProps)(Header);
