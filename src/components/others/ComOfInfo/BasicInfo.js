import React from "react";
import { connect } from "react-redux";
import "../../../css/info.css";
import Edit from "../../../imgs/edit.png";
import Cancel from "../../../imgs/cancel.png";
import check from "../../../imgs/check.png";

import { checkUserInfo } from "../../../store/actions/authAction";
import { updateInfoToFirestore } from "../../../store/actions/authAction";

class BasicInfo extends React.Component {
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
    console.log("調整基本資料");
    // setState(prevState => ({ disabled: false }));
    this.setState({ disabled: false }, () => {
      //callback
      console.log(this.state.disabled);
    });
  };

  checkInfoChange = () => {
    console.log("基本資料更新完畢");
    this.setState({ disabled: true }, () => {
      //callback
      console.log(this.state.disabled);
    });
  };

  updateInfo = e => {
    console.log("基本資料更新中");
    let infoName = e.target.name;
    let infoData = e.target.value;
    let userUID = this.props.auth.uid;
    this.props.updateInfoToFirestore(userUID, infoName, infoData);
  };

  cancelInfoChange = () => {
    console.log("取消更新基本資料");
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
          src={Edit}
          className="basicInfoEdit"
          onClick={this.handleInfoChange}
        />
      );
    } else {
      editButtons = (
        <div>
          <img
            src={Cancel}
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
        <div className="titleTitle">
          <div className="titlewords">基本資料</div>
          <div className="divideLine"></div>
          {editButtons}
        </div>
        <div className="userName">
          <div>用戶姓名</div>
          <input
            name="Name"
            placeholder={this.props.userInfo.Name}
            onChange={this.updateInfo}
            disabled={this.state.disabled ? "disabled" : ""}
          />
        </div>
        <div className="userAge">
          <div>用戶年齡</div>
          <input
            name="Age"
            placeholder={this.props.userInfo.Age}
            onChange={this.updateInfo}
            disabled={this.state.disabled ? "disabled" : ""}
          />
          歲
        </div>
        <div className="userSexual">
          <div>用戶性別</div>
          <input
            name="Sexual"
            placeholder={this.props.userInfo.Sexual}
            onChange={this.updateInfo}
            disabled={this.state.disabled ? "disabled" : ""}
          />
        </div>
        <div className="userHeight">
          <div>用戶身高</div>
          <input
            name="Height"
            placeholder={this.props.userInfo.Height}
            onChange={this.updateInfo}
            disabled={this.state.disabled ? "disabled" : ""}
          />
          公分
        </div>
        <div className="userWeight">
          <div>用戶體重</div>
          <input
            name="Weight"
            placeholder={this.props.userInfo.Weight}
            onChange={this.updateInfo}
            disabled={this.state.disabled ? "disabled" : ""}
          />
          公斤
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
)(BasicInfo);
