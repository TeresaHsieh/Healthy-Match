import React from "react";
import { connect } from "react-redux";
import "../../../css/info.css";
import Edit from "../../../imgs/edit.png";
import Cancel from "../../../imgs/cancel.png";
import check from "../../../imgs/check.png";
import ChefMatch from "../../../imgs/chef-match.png";

import { checkUserInfo } from "../../../store/actions/authAction";
import { updateInfoToFirestore } from "../../../store/actions/authAction";

class MatchInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true
    };
  }

  componentDidMount = () => {
    console.log("did mount", this.props.userInfo);
    if (this.props.userInfo.MatchName) {
      this.setState(this.props.userInfo);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log("成功吧！", this.props.userInfo);
    if (!prevState.MatchName) {
      console.log("set", this.props.userInfo);
      this.setState(this.props.userInfo);
    }
  };

  // 按編輯按鈕
  handleInfoChange = () => {
    console.log("調整麻吉資料");
    this.setState({ disabled: false }, () => {
      console.log(this.state.disabled);
    });
  };

  // 按勾勾
  checkInfoChange = () => {
    console.log("麻吉資料更新完畢");
    this.setState({ disabled: true }, () => {
      //callback
      console.log(this.state.disabled);
    });
    let userUID = this.props.auth.uid;
    let MatchName = this.state.MatchName;
    let wholeState = {
      MatchName: MatchName
    };
    this.props.updateInfoToFirestore(userUID, wholeState);
  };

  // onchange 時
  updateInfo = e => {
    console.log("麻吉資料更新中");
    let infoName = e.target.name;
    let infoData = e.target.value;
    if (infoData) {
      this.setState({ [infoName]: infoData });
    }
  };

  // 按叉叉
  cancelInfoChange = () => {
    console.log("取消更新麻吉資料");
    this.setState({ disabled: true }, () => {
      //callback
      console.log(this.state.disabled);
    });
    this.setState(this.props.userInfo);
  };

  render() {
    if (!this.state.MatchCharacterIMG) {
      return <div> Loading (｡･ω･｡)ﾉ </div>;
    }
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
            className="cancel"
            onClick={this.cancelInfoChange}
            // className="basicInfoEdit"
            // onClick={this.handleInfoChange}
          />
          <img
            src={check}
            className="check"
            alt="check"
            onClick={this.checkInfoChange}
          />
        </div>
      );
    }
    return (
      <div className="more-info-match">
        <div className="titleTitle">
          <div className="titlewords">麻吉資料</div>

          <div className="divideLine"></div>
          {editButtons}
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
)(MatchInfo);
