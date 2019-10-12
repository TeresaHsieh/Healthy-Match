import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";

import "../../css/common.css";
import SideDrawer from "../common/SideDrawer";

class Hamburger extends React.Component {
  constructor() {
    super();
    this.state = {
      openHamburger: false
    };
  }

  openSideDrawer = () => {
    this.setState({ openHamburger: true }, () => {
      //callback
    });
  };

  closeSideDrawer = () => {
    this.setState({ openHamburger: false }, () => {
      //callback
    });
  };

  render() {
    const { auth } = this.props;
    const links = auth.uid ? (
      <NavLink to="/log-out"> 登出 </NavLink>
    ) : (
      <NavLink to="/member"> 註冊/登入 </NavLink>
    );
    const openHamburger = this.state.openHamburger;

    return (
      <div>
        <button className="hamburger-button" onClick={this.openSideDrawer}>
          <div className="hamburger-line" />
          <div className="hamburger-line" />
          <div className="hamburger-line" />
        </button>
        {openHamburger ? (
          <header className="mobile-header">
            <div className="mobile-main-nav">
              <a
                href="javascript:void(0)"
                className="closebtn"
                onClick={this.closeSideDrawer}
              >
                ×
              </a>
              <NavLink to="/daily-record"> 每日記錄 </NavLink>
              <NavLink to="/history"> 營養歷史 </NavLink>
              <NavLink to="/add-data"> 添加營養 </NavLink>
              <NavLink to="/match-status"> 麻吉樂園 </NavLink>
              <NavLink to="/info"> 會員資料 </NavLink>

              {links}
            </div>
          </header>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};
export default connect(mapStateToProps)(Hamburger);
