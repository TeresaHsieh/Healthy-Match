import React from "react";
import "../../css/addDatabase.css";
import { connect } from "react-redux";
import { sentDataToNutritionDatbase } from "../../store/actions/dailyAction";
import { personalNutritionContribution } from "../../store/actions/dailyAction";

import { Route, NavLink, Redirect } from "react-router-dom";
import ListMatch from "../../imgs/list-match.png";

// App Components
import Header from "../common/Header";

class CustomForm extends React.Component {
  constructor() {
    super();
    this.state = { openContributionSuccessfulBox: false };
  }

  handleChange = e => {
    if (isNaN(e.target.value)) {
      this.setState({
        [e.target.id]: e.target.value
      });
    } else {
      this.setState({
        [e.target.id]: Number(e.target.value)
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.sentDataToNutritionDatbase(this.state);
    this.props.personalNutritionContribution(this.props.auth.uid, this.state);

    this.setState({
      openContributionSuccessfulBox: true
    });
    setTimeout(
      function() {
        this.setState({ openContributionSuccessfulBox: false });
      }.bind(this),
      2000
    );
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="./member" />;

    const openContributionSuccessfulBox = this.state
      .openContributionSuccessfulBox;

    return (
      <div>
        <Header />
        <div className="customForm">
          <div className="intro">
            <span className="titleOne">找不到你輸入的食物嗎？</span>
            <span className="titleTwo">打造屬於你的食物營養指標！</span>
          </div>
          <form className="custom-form">
            <input
              placeholder="輸入食物名稱"
              onChange={this.handleChange}
              id="食品名稱"
            ></input>
            <input
              placeholder="輸入食物「修正後熱量」（每 100g）"
              onChange={this.handleChange}
              id="修正熱量(kcal)"
            ></input>
            <input
              placeholder="輸入食物「粗蛋白」總量（每 100g）"
              onChange={this.handleChange}
              id="粗蛋白(g)"
            ></input>
            <input
              placeholder="輸入食物「粗脂肪」總量（每 100g）"
              onChange={this.handleChange}
              id="粗脂肪(g)"
            ></input>
            <input
              placeholder="輸入食物「總碳水化合物」總量（每 100g）"
              onChange={this.handleChange}
              id="總碳水化合物(g)"
            ></input>
            <input
              placeholder="輸入食物「α-維生素E」總量（每 100g）"
              onChange={this.handleChange}
              id="α-維生素E當量(α-TE)(mg)"
            ></input>
            <input
              placeholder="輸入食物「維生素 A」總量（每 100g）"
              onChange={this.handleChange}
              id="維生素A總量(IU)"
            ></input>
            <input
              placeholder="輸入食物「維生素 B1」總量（每 100g）"
              onChange={this.handleChange}
              id="維生素B1(mg)"
            ></input>
            <input
              placeholder="輸入食物「維生素 B12」總量（每 100g）"
              onChange={this.handleChange}
              id="維生素B1(ug)"
            ></input>
            <input
              placeholder="輸入食物「維生素 B2」總量（每 100g）"
              onChange={this.handleChange}
              id="維生素B2(mg)"
            ></input>
            <input
              placeholder="輸入食物「維生素 B6」總量（每 100g）"
              onChange={this.handleChange}
              id="維生素B6(mg)"
            ></input>
            <input
              placeholder="輸入食物「維生素 C」總量（每 100g）"
              onChange={this.handleChange}
              id="維生素C(mg)"
            ></input>
            <input
              placeholder="輸入食物「維生素 E」總量（每 100g）"
              onChange={this.handleChange}
              id="維生素E總量(mg)"
            ></input>
            <input
              placeholder="輸入食物「磷」總量（每 100g）"
              onChange={this.handleChange}
              id="磷(mg)"
            ></input>
            <input
              placeholder="輸入食物「鈉」總量（每 100g）"
              onChange={this.handleChange}
              id="鈉(mg)"
            ></input>
            <input
              placeholder="輸入食物「鈣」總量（每 100g）"
              onChange={this.handleChange}
              id="鈣(mg)"
            ></input>
            <input
              placeholder="輸入食物「鉀」總量（每 100g）"
              onChange={this.handleChange}
              id="鉀(mg)"
            ></input>
            <input
              placeholder="輸入食物「銅」總量（每 100g）"
              onChange={this.handleChange}
              id="銅(mg)"
            ></input>
            <input
              placeholder="輸入食物「鋅」總量（每 100g）"
              onChange={this.handleChange}
              id="鋅(mg)"
            ></input>
            <input
              placeholder="輸入食物「錳」總量（每 100g）"
              onChange={this.handleChange}
              id="錳(mg)"
            ></input>
            <input
              placeholder="輸入食物「鎂」總量（每 100g）"
              onChange={this.handleChange}
              id="鎂(mg)"
            ></input>
            <input
              placeholder="輸入食物「鐵」總量（每 100g）"
              onChange={this.handleChange}
              id="鐵(mg)"
            ></input>
          </form>
          <button className="sentToDataBase" onClick={this.handleSubmit}>
            送出營養素！
          </button>
        </div>
        {openContributionSuccessfulBox ? (
          <div className="backgroundContributionSuccessful">
            <div className="sentContributionSuccessfulDetail">
              <img src={ListMatch} className="list-match" />
              <p>營養素紀錄已經成功送出囉！謝謝你的貢獻！</p>
            </div>
          </div>
        ) : (
          ""
        )}
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
    sentDataToNutritionDatbase: newNutrition => {
      dispatch(sentDataToNutritionDatbase(newNutrition));
    },

    personalNutritionContribution: (useruid, newNutrition) => {
      dispatch(personalNutritionContribution(useruid, newNutrition));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomForm);
