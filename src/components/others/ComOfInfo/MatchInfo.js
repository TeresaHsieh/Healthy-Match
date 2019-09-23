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
    this.props.checkUserInfo(this.props.auth.uid);
    console.log(this.props);
  };

  handleInfoChange = () => {
    console.log("調整麻吉資料");
    // setState(prevState => ({ disabled: false }));
    this.setState({ disabled: false }, () => {
      //callback
      console.log(this.state.disabled);
    });
  };

  checkInfoChange = () => {
    console.log("麻吉資料更新完畢");
    this.setState({ disabled: true }, () => {
      //callback
      console.log(this.state.disabled);
    });
  };

  updateInfo = e => {
    console.log("麻吉資料更新中");
    let infoName = e.target.name;
    let infoData = e.target.value;
    let userUID = this.props.auth.uid;
    this.props.updateInfoToFirestore(userUID, infoName, infoData);
  };

  cancelInfoChange = () => {
    console.log("取消更新麻吉資料");
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
            placeholder={this.props.userInfo.MatchName}
            onChange={this.updateInfo}
            disabled={this.state.disabled ? "disabled" : ""}
          />
        </div>
        <div className="userMatchPic">
          <div>麻吉照片</div>
          <img src={ChefMatch} className="ChefMatch2" />
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
)(MatchInfo);
