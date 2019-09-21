import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "../../css/info.css";
import ChefMatch from "../../imgs/chef-match.png";
import Edit from "../../imgs/edit.png";

import { checkUserInfo } from "../../store/actions/authAction";

// App Components
import Header from "../common/Header";

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "test@gmail.com",
      userPassword: "test123",
      userName: "Teresa Hsieh",
      userAge: "18",
      userSexual: "女生",
      userHeight: "168",
      userWeight: "50",
      userMatchName: "花生"
    };
  }

  componentDidMount = () => {
    this.props.checkUserInfo(this.props.auth.uid);
    console.log(this.props);
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="./member" />;

    return (
      <div>
        <Header />
        <div className="main-info">
          <div className="simple-info">
            <div className="userPic">
              <img src={ChefMatch} className="ChefMatch" />
            </div>
            <div className="userID">
              <div>用戶帳號</div>
              <input value={this.props.auth.email} />
              <img src={Edit} className="edit" />
            </div>
            <div className="userPassword">
              <div>用戶密碼</div>
              <input value={this.state.userPassword} />
            </div>
          </div>
          <div className="more-info">
            <div className="titleTitle">
              <div className="titlewords">基本資料</div>
              <div className="divideLine"></div>
              <img src={Edit} className="edit" />
            </div>
            <div className="userName">
              <div>用戶姓名</div>
              <input value={this.props.userInfo.Name} />
            </div>
            <div className="userAge">
              <div>用戶年齡</div>
              <input value={this.state.userAge} />歲
            </div>
            <div className="userSexual">
              <div>用戶性別</div>
              <input value={this.state.userSexual} />歲
            </div>
            <div className="userHeight">
              <div>用戶身高</div>
              <input value={this.state.userHeight} />
              公分
            </div>
            <div className="userWeight">
              <div>用戶體重</div>
              <input value={this.state.userWeight} />
              公斤
            </div>
            <div className="titleTitle">
              <div className="titlewords">麻吉資料</div>

              <div className="divideLine"></div>
              <img src={Edit} className="edit" />
            </div>
            <div className="userMatchName">
              <div>麻吉名字</div>
              <input value={this.state.userMatchName} />
            </div>
            <div className="userMatchPic">
              <div>麻吉照片</div>
              <img src={ChefMatch} className="ChefMatch2" />
            </div>
          </div>
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Info);
