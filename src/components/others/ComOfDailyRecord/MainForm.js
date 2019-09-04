import React from "react";
import { connect } from "react-redux";
// import AppendInput from "../ComOfDailyRecord/AppendInput";

// App Components
import { addRecordInput } from "../../../store/actions/dailyAction";
import { updateDailyRecordName } from "../../../store/actions/dailyAction";
import { updateDailyRecordServe } from "../../../store/actions/dailyAction";
import Delete from "../../../imgs/delete.png";

class MainForm extends React.Component {
  // submit state to the firebase
  // addMealData = () => {
  // return {
  //   meals: meal.toString(),
  //   meal: prevState.snack
  // };
  // 以下為上方 object 改寫
  // let object = {};
  // object.meals = meal.toString();
  // object[meal] = prevState.snack;
  // };

  // change input, change data (state)
  inputNameChange = e => {
    let meal = window.location.pathname.split("/")[2]; // checking by url subpath

    let obj = {};
    let foodName = e.target.value;
    obj[meal] = [{ foodName: foodName }];
    this.props.updateDailyRecordName(obj);
  };

  inputClassChange = e => {
    let meal = window.location.pathname.split("/")[2]; // checking by url subpath

    let obj = {};
    let foodServe = e.target.value;
    obj[meal] = [{ foodServe: foodServe }];
    this.props.updateDailyRecordServe(obj);
  };

  appendInput = () => {
    let emptyName = [{ foodName: "" }];
    let emptyServe = [{ foodServe: "" }];
    this.props.addRecordInput(emptyName, emptyServe);
  };

  render() {
    return (
      <div className="main-form">
        <form className="main-input">
          <input
            placeholder="輸入食物名稱"
            className="food-name"
            onChange={this.inputNameChange}
          ></input>
          <input
            placeholder="輸入食物份量（100g 為一份）"
            className="food-serve"
            onChange={this.inputClassChange}
          ></input>
          <img src={Delete} className="delete-button"></img>
        </form>
        <button className="add-input" onClick={this.appendInput}>
          新增欄位
        </button>
        <button className="add-record">新增紀錄</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    date: new Date().toLocaleDateString(),
    meals: state.daily.meals,
    breakfast: state.daily.breakfast,
    lunch: state.daily.lunch,
    dinner: state.daily.dinner,
    snack: state.daily.snack,
    record: state.daily.record,
    recordName: state.daily.recordName,
    recordServe: state.daily.recordServe
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // create a method
    addRecordInput: (emptyName, emptyServe) => {
      dispatch(addRecordInput(emptyName, emptyServe));
    },
    updateDailyRecordName: newRecord => {
      dispatch(updateDailyRecordName(newRecord));
    },
    updateDailyRecordServe: newRecord => {
      dispatch(updateDailyRecordServe(newRecord));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainForm);
