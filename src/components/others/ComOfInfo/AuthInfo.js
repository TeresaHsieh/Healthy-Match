import React from "react";
import { connect } from "react-redux";
import "../../../css/info.css";
import Edit from "../../../imgs/edit.png";
import Cancel from "../../../imgs/cancel.png";
import check from "../../../imgs/check.png";
import ChefMatch from "../../../imgs/chef-match.png";

import { checkUserInfo } from "../../../store/actions/authAction";
import { updateInfoToFirestore } from "../../../store/actions/authAction";

class AuthInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true
    };
  }

  componentDidMount = () => {
    this.props.checkUserInfo(this.props.auth.uid);
    console.log(this.props);
  };

  handleInfoChange = () => {
    console.log("調整帳戶資料");
    // setState(prevState => ({ disabled: false }));
    this.setState({ disabled: false }, () => {
      //callback
      console.log(this.state.disabled);
    });
  };

  checkInfoChange = () => {
    console.log("帳戶資料更新完畢");
    this.setState({ disabled: true }, () => {
      //callback
      console.log(this.state.disabled);
    });
  };

  updateInfo = e => {
    console.log("帳戶資料更新中");
    let infoName = e.target.name;
    let infoData = e.target.value;
    let userUID = this.props.auth.uid;
    this.props.updateInfoToFirestore(userUID, infoName, infoData);
  };

  cancelInfoChange = () => {
    console.log("取消更新帳戶資料");
    this.setState({ disabled: true }, () => {
      //callback
      console.log(this.state.disabled);
    });
  };

  render() {
    const disabled = this.state.disabled;
    let editButtons;

    if (disabled) {
      editButtons = (
        <img
          src={`/${Edit}`}
          className="accountEdit"
          onClick={this.handleInfoChange}
        />
      );
    } else {
      editButtons = (
        <div>
          <img
            src={`/${Cancel}`}
            alt="cancel"
            onClick={this.cancelInfoChange}
            // className="basicInfoEdit"
            // onClick={this.handleInfoChange}
          />
          <img src={check} alt="check" onClick={this.checkInfoChange} />
        </div>
      );
    }
    return (
      <div>
        <div className="userPic">
          <img src={ChefMatch} className="ChefMatch" />
        </div>
        <div className="userID">
          {/* <div>用戶帳號</div> */}
          <input
            name="ID"
            placeholder={this.props.auth.email}
            onChange={this.updateInfo}
            disabled={this.state.disabled ? "disabled" : ""}
          />
          {editButtons}
        </div>
        <div className="userPassword">
          {/* <div>用戶密碼</div> */}
          <input
            name="Password"
            placeholder={this.state.userPassword}
            onChange={this.updateInfo}
            disabled={this.state.disabled ? "disabled" : ""}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    date: new Date().toLocaleDateString(),
    auth: state.firebase.auth,
    userInfo: state.firebase.profile,
    matchImgDownloadURL: state.firebase
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // create a method
    checkUserInfo: userUID => {
      dispatch(checkUserInfo(userUID));
    },
    updateInfoToFirestore: (userUID, infoName, infoData) => {
      dispatch(updateInfoToFirestore(userUID, infoName, infoData));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthInfo);
