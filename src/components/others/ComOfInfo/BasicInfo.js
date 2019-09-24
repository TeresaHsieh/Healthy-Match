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
    console.log("did mount", this.props.userInfo);
    if (this.props.userInfo.Name) {
      this.setState(this.props.userInfo);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log("成功吧！", this.props.userInfo);
    if (
      !prevState.Name &&
      !prevState.Age &&
      !prevState.Sexual &&
      !prevState.Height &&
      !prevState.Weight
    ) {
      console.log("set", this.props.userInfo);
      this.setState(this.props.userInfo);
    }
  };

  // 按編輯按鈕
  handleInfoChange = () => {
    console.log("調整基本資料");
    this.setState({ disabled: false }, () => {
      console.log(this.state.disabled);
    });
  };

  // 按勾勾
  checkInfoChange = () => {
    console.log("基本資料更新完畢");
    this.setState({ disabled: true }, () => {
      console.log(this.state.disabled);
    });
    let userUID = this.props.auth.uid;
    let Name = this.state.Name;
    let Age = this.state.Age;
    let Sexual = this.state.Sexual;
    let Height = this.state.Height;
    let Weight = this.state.Weight;
    let MatchName = this.state.MatchName;
    let wholeState = {
      Name: Name,
      Age: Age,
      Sexual: Sexual,
      Height: Height,
      Weight: Weight,
      MatchName: MatchName
    };
    this.props.updateInfoToFirestore(userUID, wholeState);
  };

  // onchange 時
  updateInfo = e => {
    // console.log("基本資料更新中");
    let infoName = e.target.name;
    let infoData = e.target.value;
    // let userUID = this.props.auth.uid;
    // this.props.updateInfoToFirestore(userUID, infoName, infoData);
    this.setState({ [infoName]: infoData });
  };

  // 按叉叉
  cancelInfoChange = () => {
    console.log("取消更新基本資料");
    this.setState({ disabled: true }, () => {
      console.log(this.state.disabled);
    });
    this.setState(this.props.userInfo);
  };

  render() {
    if (
      !this.state.Name &&
      !this.state.Age &&
      !this.state.Sexual &&
      !this.state.Height &&
      !this.state.Weight
    ) {
      return <div> Loading (｡･ω･｡)ﾉ </div>;
    }
    const disabled = this.state.disabled;
    let editButtons;

    if (disabled) {
      editButtons = (
        <img
          src={`/${Edit}`}
          className="basicInfoEdit"
          onClick={this.handleInfoChange}
        />
      );
    } else {
      editButtons = (
        <div>
          <img
            src={`/${Cancel}`}
            alt="cancel"
            className="cancel"
            onClick={this.cancelInfoChange}
          />
          <img
            src={check}
            alt="check"
            className="check"
            onClick={this.checkInfoChange}
          />
        </div>
      );
    }

    return (
      <div className="more-info-basic">
        <div className="titleTitle">
          <div className="titlewords">用戶資料</div>
          <div className="divideLine"></div>
          {editButtons}
        </div>
        <div className="userName">
          <div>用戶姓名</div>
          <input
            name="Name"
            //placeholder={this.props.userInfo.Name}
            value={this.state.Name}
            onChange={this.updateInfo}
            disabled={this.state.disabled ? "disabled" : ""}
          />
        </div>
        <div className="userAge">
          <div>用戶年齡</div>
          <input
            name="Age"
            //placeholder={this.props.userInfo.Age}
            value={this.state.Age}
            onChange={this.updateInfo}
            disabled={this.state.disabled ? "disabled" : ""}
          />
          歲
        </div>
        <div className="userSexual">
          <div>用戶性別</div>
          <input
            name="Sexual"
            //placeholder={this.props.userInfo.Sexual}
            value={this.state.Sexual}
            onChange={this.updateInfo}
            disabled={this.state.disabled ? "disabled" : ""}
          />
        </div>
        <div className="userHeight">
          <div>用戶身高</div>
          <input
            name="Height"
            //placeholder={this.props.userInfo.Height}
            value={this.state.Height}
            onChange={this.updateInfo}
            disabled={this.state.disabled ? "disabled" : ""}
          />
          公分
        </div>
        <div className="userWeight">
          <div>用戶體重</div>
          <input
            name="Weight"
            // placeholder={this.props.userInfo.Weight}
            value={this.state.Weight}
            onChange={this.updateInfo}
            disabled={this.state.disabled ? "disabled" : ""}
          />
          公斤
        </div>
        <div className="userMatchName">
          <div>麻吉名字</div>
          <input
            name="MatchName"
            // placeholder={this.props.userInfo.MatchName}
            value={this.state.MatchName}
            onChange={this.updateInfo}
            disabled={this.state.disabled ? "disabled" : ""}
          />
        </div>
        <div className="userMatchPic">
          <div>麻吉照片</div>
          <img
            src={this.props.userInfo.MatchCharacterIMG}
            className="ChefMatch2"
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
    userInfo: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // create a method
    checkUserInfo: userUID => {
      dispatch(checkUserInfo(userUID));
    },
    updateInfoToFirestore: (userUID, wholeState) => {
      dispatch(updateInfoToFirestore(userUID, wholeState));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicInfo);
