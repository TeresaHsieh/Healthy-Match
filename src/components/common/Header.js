import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOut from "../others/ComOfMember/LogOut";

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
    this.checkForHeaderStyle();
    window.addEventListener("resize", this.checkForHeaderStyle);
  };

  checkForHeaderStyle = () => {
    console.log(document.body.offsetWidth);
    if (document.body.offsetWidth < Number(1125)) {
      this.setState({ screenMobile: true });
    } else {
      this.setState({ screenMobile: false });
    }
  };

  render() {
    const { auth } = this.props;
    const links = auth.uid ? (
      <div>
        <NavLink to="/info"> 會員資料 </NavLink>
        <NavLink to="/log-out"> 登出 </NavLink>
      </div>
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
            <NavLink to="/add-data"> 添加營養 </NavLink>
            <NavLink to="/match-status"> 麻吉樂園 </NavLink>
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
