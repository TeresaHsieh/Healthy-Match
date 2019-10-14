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
      openContributionSuccessfulBox: true,
      食品名稱: "",
      "修正熱量(kcal)": "",
      "粗蛋白(g)": "",
      "粗脂肪(g)": "",
      "總碳水化合物(g)": "",
      "α-維生素E當量(α-TE)(mg)": "",
      "維生素A總量(IU)": "",
      "維生素B1(mg)": "",
      "維生素B1(ug)": "",
      "維生素B2(mg)": "",
      "維生素B6(mg)": "",
      "維生素C(mg)": "",
      "維生素E總量(mg)": "",
      "磷(mg)": "",
      "鈉(mg)": "",
      "鈣(mg)": "",
      "鉀(mg)": "",
      "銅(mg)": "",
      "鋅(mg)": "",
      "錳(mg)": "",
      "鎂(mg)": "",
      "鐵(mg)": ""
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
              value={this.state.食品名稱}
              id="食品名稱"
            ></input>
            <input
              placeholder="輸入食物「修正後熱量」（每 100g）"
              onChange={this.handleChange}
              value={this.state["修正熱量(kcal)"]}
              id="修正熱量(kcal)"
            ></input>
            <input
              placeholder="輸入食物「粗蛋白」總量（每 100g）"
              onChange={this.handleChange}
              value={this.state["粗蛋白(g)"]}
              id="粗蛋白(g)"
            ></input>
            <input
              placeholder="輸入食物「粗脂肪」總量（每 100g）"
              onChange={this.handleChange}
              value={this.state["粗脂肪(g)"]}
              id="粗脂肪(g)"
            ></input>
            <input
              placeholder="輸入食物「總碳水化合物」總量（每 100g）"
              onChange={this.handleChange}
              value={this.state["總碳水化合物(g)"]}
              id="總碳水化合物(g)"
            ></input>
            <input
              placeholder="輸入食物「α-維生素E」總量（每 100g）"
              onChange={this.handleChange}
              value={this.state["α-維生素E當量(α-TE)(mg)"]}
              id="α-維生素E當量(α-TE)(mg)"
            ></input>
            <input
              placeholder="輸入食物「維生素 A」總量（每 100g）"
              onChange={this.handleChange}
              value={this.state["維生素A總量(IU)"]}
              id="維生素A總量(IU)"
            ></input>
            <input
              placeholder="輸入食物「維生素 B1」總量（每 100g）"
              onChange={this.handleChange}
              value={this.state["維生素B1(mg)"]}
              id="維生素B1(mg)"
            ></input>
            <input
              placeholder="輸入食物「維生素 B12」總量（每 100g）"
              onChange={this.handleChange}
              value={this.state["維生素B1(ug)"]}
              id="維生素B1(ug)"
            ></input>
            <input
              placeholder="輸入食物「維生素 B2」總量（每 100g）"
              onChange={this.handleChange}
              value={this.state["維生素B2(mg)"]}
              id="維生素B2(mg)"
            ></input>
            <input
              placeholder="輸入食物「維生素 B6」總量（每 100g）"
              onChange={this.handleChange}
              value={this.state["維生素B6(mg)"]}
              id="維生素B6(mg)"
            ></input>
            <input
              placeholder="輸入食物「維生素 C」總量（每 100g）"
              onChange={this.handleChange}
              value={this.state["維生素C(mg)"]}
              id="維生素C(mg)"
            ></input>
            <input
              placeholder="輸入食物「維生素 E」總量（每 100g）"
              onChange={this.handleChange}
              value={this.state["維生素E總量(mg)"]}
              id="維生素E總量(mg)"
            ></input>
            <input
              placeholder="輸入食物「磷」總量（每 100g）"
              onChange={this.handleChange}
              value={this.state["磷(mg)"]}
              id="磷(mg)"
            ></input>
            <input
              placeholder="輸入食物「鈉」總量（每 100g）"
              onChange={this.handleChange}
              value={this.state["鈉(mg)"]}
              id="鈉(mg)"
            ></input>
            <input
              placeholder="輸入食物「鈣」總量（每 100g）"
              onChange={this.handleChange}
              value={this.state["鈣(mg)"]}
              id="鈣(mg)"
            ></input>
            <input
              placeholder="輸入食物「鉀」總量（每 100g）"
              onChange={this.handleChange}
              value={this.state["鉀(mg)"]}
              id="鉀(mg)"
            ></input>
            <input
              placeholder="輸入食物「銅」總量（每 100g）"
              onChange={this.handleChange}
              value={this.state["銅(mg)"]}
              id="銅(mg)"
            ></input>
            <input
              placeholder="輸入食物「鋅」總量（每 100g）"
              onChange={this.handleChange}
              value={this.state["鋅(mg)"]}
              id="鋅(mg)"
            ></input>
            <input
              placeholder="輸入食物「錳」總量（每 100g）"
              onChange={this.handleChange}
              value={this.state["錳(mg)"]}
              id="錳(mg)"
            ></input>
            <input
              placeholder="輸入食物「鎂」總量（每 100g）"
              onChange={this.handleChange}
              value={this.state["鎂(mg)"]}
              id="鎂(mg)"
            ></input>
            <input
              placeholder="輸入食物「鐵」總量（每 100g）"
              onChange={this.handleChange}
              value={this.state["鐵(mg)"]}
              id="鐵(mg)"
            ></input>
          </form>
          <button className="sentToDataBase" onClick={this.handleSubmit}>
            <span>送出營養素！</span>
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
