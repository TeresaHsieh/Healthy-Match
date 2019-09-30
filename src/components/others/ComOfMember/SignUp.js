import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { signUp } from "../../../store/actions/authAction";
import { Redirect } from "react-router-dom";
import "../../../css/member.css";
import girlMatch from "../../../imgs/girlMatch.png";
import boyMatch from "../../../imgs/boyMatch.png";

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      matchGender: "",
      signUpDate: ""
    };
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    // let signUpDay = new Date();
    // let year = signUpDay.getFullYear();
    // let month = signUpDay.getMonth() + 1; // if no plus one, the result would be August when expected September
    // let day = signUpDay.getDate();

    // let yearString = year.toString();

    // let monthString = "";
    // if (month < 10) {
    //   monthString = "0" + month.toString();
    // } else {
    //   monthString = month.toString();
    // }

    // let dayString = "";
    // if (day < 10) {
    //   dayString = "0" + day.toString();
    // } else {
    //   dayString = day.toString();
    // }

    // let signUpDate = yearString + monthString + dayString; // default : signUpDay
    // this.setState({ signUpDate: signUpDate });
    this.props.signUp(this.state);
  };
  render() {
    const { auth } = this.props;
    //if (auth.uid) return <Redirect to="./" />;

    return (
      // <form className="sign-up">
      //   <div className="sign-up-user-name">
      //     <span>姓名：</span>
      //     <input
      //       placeholder="輸入姓名"
      //       id="name"
      //       onChange={this.handleChange}
      //     ></input>
      //   </div>
      //   <div className="sign-up-user-email">
      //     <span>信箱：</span>
      //     <input
      //       placeholder="輸入信箱"
      //       type="email"
      //       id="email"
      //       onChange={this.handleChange}
      //     ></input>
      //   </div>
      //   <div className="sign-up-user-password">
      //     <span>密碼：</span>
      //     <input
      //       placeholder="輸入密碼"
      //       type="password"
      //       id="password"
      //       onChange={this.handleChange}
      //     />
      //   </div>
      //   <div className="sign-up-user-checked-password">
      //     <span>確認密碼：</span>
      //     <input
      //       placeholder="確認密碼"
      //       type="password"
      //       id="passwordCheck"
      //       onChange={this.handleChange}
      //     />
      //   </div>
      //   <div className="sign-up-matchSelect">
      //     <div>
      //       <p className="select-title">挑選麻吉：</p>

      //       <div className="boymatch">
      //         <input
      //           type="radio"
      //           id="matchGender"
      //           value="boyMatch"
      //           onChange={this.handleChange}
      //         />
      //         <span>活潑麻糬</span>
      //         <img src={`/${boyMatch}`} className="boyMatch" />
      //       </div>
      //       <div className="girlmatch">
      //         <input
      //           type="radio"
      //           id="matchGender"
      //           value="girlMatch"
      //           onChange={this.handleChange}
      //         />
      //         <span>氣質麻糬</span>
      //         <img src={`/${girlMatch}`} className="girlMatch" />
      //       </div>
      //     </div>
      //   </div>
      //   <button className="register" onClick={this.handleSubmit}>
      //     <NavLink to="/info">確認註冊！</NavLink>
      //   </button>
      // </form>
      <div className="sign-up">
        <form>
          <div className="sign-up-item-name">
            <div>姓名：</div>
            <div>信箱：</div>
            <div>密碼：</div>
            <div>確認密碼：</div>
            <div>挑選麻吉：</div>
          </div>
          <div className="sign-up-item-value">
            <input
              placeholder="輸入姓名"
              id="name"
              onChange={this.handleChange}
            ></input>
            <input
              placeholder="輸入信箱"
              type="email"
              id="email"
              onChange={this.handleChange}
            ></input>
            <input
              placeholder="輸入密碼"
              type="password"
              id="password"
              onChange={this.handleChange}
            />
            <input
              placeholder="確認密碼"
              type="password"
              id="passwordCheck"
              onChange={this.handleChange}
            />
            <p className="mobileHint">請選擇一隻麻吉</p>
            <div className="boymatch">
              <input
                type="radio"
                id="matchGender"
                value="boyMatch"
                onChange={this.handleChange}
                className="boymatchInput"
              />
              <span>活潑麻糬</span>
              <img src={`/${boyMatch}`} className="boyMatch" />
            </div>
            <div className="girlmatch">
              <input
                type="radio"
                id="matchGender"
                value="girlMatch"
                onChange={this.handleChange}
                className="girlmatchInput"
              />
              <span>氣質麻糬</span>
              <img src={`/${girlMatch}`} className="girlMatch" />
            </div>
          </div>
        </form>
        <button className="register" onClick={this.handleSubmit}>
          <NavLink to="/info">確認註冊！</NavLink>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: newUser => dispatch(signUp(newUser))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
