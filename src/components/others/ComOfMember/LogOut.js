import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../../store/actions/authAction";

// App Components
import ByeMatch from "../../../imgs/bye-match.gif";

class LogOut extends React.Component {
  render() {
    return (
      <div className="log-out">
        <img src={ByeMatch} className="bye-match" />
        <p>確定登出嗎～？</p>
        <div className="exit-buttons">
          <button className="log-out-button">
            <NavLink to="/" onClick={this.props.signOut}>
              <span>我先走囉！</span>
            </NavLink>
          </button>
          <button className="stay-button">
            <NavLink to="/daily-record">
              <span>再玩耍一下</span>
            </NavLink>
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(LogOut);
