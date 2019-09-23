import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "../../css/info.css";
import ChefMatch from "../../imgs/chef-match.png";
import Edit from "../../imgs/edit.png";
import BasicInfo from "../../components/others/ComOfInfo/BasicInfo";
import AuthInfo from "../../components/others/ComOfInfo/AuthInfo";
import MatchInfo from "../../components/others/ComOfInfo/MatchInfo";
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
      // disabled: true
    };
  }

  componentDidMount = () => {
    // this.props.checkUserInfo(this.props.auth.uid);
    console.log(this.props);
  };

  handleInfoChange = () => {
    console.log("調整資料");
  };

  render() {
    const { auth } = this.props;
    // if (!auth.uid) return <Redirect to="./member" />;

    return (
      <div>
        <Header />
        <div className="main-info">
          <div className="simple-info">
            <AuthInfo />
          </div>
          <div className="more-info">
            <BasicInfo />
            <MatchInfo />
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
