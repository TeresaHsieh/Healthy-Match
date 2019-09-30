import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "../../css/info.css";
import ChefMatch from "../../imgs/chef-match.png";
import Edit from "../../imgs/edit.png";
import BasicInfo from "../../components/others/ComOfInfo/BasicInfo";
import AuthInfo from "../../components/others/ComOfInfo/AuthInfo";
import ContributionInfo from "../others/ComOfInfo/ContributionInfo";
import { checkUserInfo } from "../../store/actions/authAction";
import SignUpRedirect from "../others/ComOfMember/SignUpRedirect";

import LoveMatch from "../../imgs/love-match.png";

// App Components
import Header from "../common/Header";
import { relativeTimeRounding } from "moment";

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openFirstSignUpBox: false
    };
  }

  componentDidMount = () => {
    // this.props.checkUserInfo(this.props.auth.uid);
    if (
      // !this.props.userInfo.Name &&
      !this.props.userInfo.Age &&
      !this.props.userInfo.Weight &&
      !this.props.userInfo.Height &&
      !this.props.userInfo.Sexual
    ) {
      this.setState({ openFirstSignUpBox: true });
    }
  };

  handleInfoChange = () => {
    console.log("調整資料");
  };

  closeFirstSignUpBox = () => {
    this.setState({ openFirstSignUpBox: false });
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="./member" />;

    const openFirstSignUpBox = this.state.openFirstSignUpBox;

    return (
      <div>
        <Header />
        <div className="main-info">
          {openFirstSignUpBox ? (
            <div className="backgroundSignUpRedirectBox">
              <div className="signUpRedirectBox">
                <SignUpRedirect />{" "}
                <button onClick={this.closeFirstSignUpBox}>我知道了！</button>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="simple-info">
            {/* <h1>
              HELLO :)
              <br /> {this.props.userInfo.Name}
            </h1> */}
            {/* <AuthInfo /> */}
          </div>
          <div className="more-info">
            <BasicInfo />
            <ContributionInfo />
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
    userInfo: state.firebase.profile
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
