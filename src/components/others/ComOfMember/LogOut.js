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
          <button>
            <NavLink to="/" onClick={this.props.signOut}>
              我先走囉！
            </NavLink>
          </button>
          <button>再玩耍一下</button>
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
