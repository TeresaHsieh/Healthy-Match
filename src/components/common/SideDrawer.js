// All imports
import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

// App Components and Actions
import "../../css/common.css";

const SideDrawer = props => {
  const { auth } = props;
  const links = auth.uid ? (
    <NavLink to="/log-out"> 登出 </NavLink>
  ) : (
    <NavLink to="/member"> 註冊 / 登入 </NavLink>
  );

  return (
    <header className="mobile-header">
      <div className="mobile-main-nav">
        <a href="javascript:void(0)" className="closebtn" onClick="closeNav()">
          ×
        </a>
        <NavLink to="/daily-record"> 每日記錄 </NavLink>
        <NavLink to="/history"> 營養歷史 </NavLink>
        <NavLink to="/add-data"> 添加營養 </NavLink>
        <NavLink to="/match-status"> 麻吉樂園 </NavLink>
        {links}
      </div>
    </header>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(SideDrawer);
