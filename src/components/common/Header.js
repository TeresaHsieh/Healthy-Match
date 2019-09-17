import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";

// Components
import logo from "../../imgs/logo.png";
import Hamburger from "../common/Hamburger";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenMobile: false
    };
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.checkForHeaderStyle);
  };

  checkForHeaderStyle = () => {
    console.log(window.screen.width);
    if (window.screen.width < Number(1000)) {
      this.setState = { screenMobile: true };
    }
  };

  render() {
    const { auth } = this.props;
    const links = auth.uid ? (
      <NavLink to="/log-out"> 登出 </NavLink>
    ) : (
      <NavLink to="/member"> 註冊/登入 </NavLink>
    );
    console.log(auth);
    if (this.state.screenMobile == true) {
      return (
        <header className="header">
          <Link to="/">
            <img src={logo} className="logo" />
          </Link>
          <Hamburger />
        </header>
      );
    } else {
      return (
        <header className="header">
          <Link to="/">
            <img src={logo} className="logo" />
          </Link>
          <div className="main-nav">
            <NavLink to="/daily-record"> 每日記錄 </NavLink>
            <NavLink to="/history"> 營養歷史 </NavLink>
            <NavLink to="/match-status"> 麻吉樂園 </NavLink>
            <NavLink to="/news"> 健康新知 </NavLink>
            {/* <NavLink to="/member"> 註冊/登入 </NavLink>
    <NavLink to="/log-out"> 登出 </NavLink> */}
            {links}
          </div>
        </header>
      );
    }
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Header);
