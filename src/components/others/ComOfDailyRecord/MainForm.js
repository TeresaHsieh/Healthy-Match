import React from "react";
import { connect } from "react-redux";
import AppendInput from "../ComOfDailyRecord/AppendInput";

// App Components
import { addRecordInputName } from "../../../store/actions/dailyAction";
import { addRecordInputServe } from "../../../store/actions/dailyAction";
import { sendDataToFirebase } from "../../../store/actions/dailyAction";
import { updateDailyRecordName } from "../../../store/actions/dailyAction";
import { updateDailyRecordServe } from "../../../store/actions/dailyAction";
import Delete from "../../../imgs/delete.png";

class MainForm extends React.Component {
  constructor() {
    super();
    this.state = {
      addInputComponent: 0
    };
  }
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
    console.log(e.target.id);
    let meal = window.location.pathname.split("/")[2]; // checking by url subpath
    let obj = {};
    let foodName = e.target.value;
    obj[meal] = [{ foodName: foodName }];
    // when no state in Redux store, add first data
    if (this.props.recordName == undefined) {
      this.props.updateDailyRecordName(obj);
    } else {
      this.props.addRecordInputName(obj);
    }
  };

  inputServeChange = e => {
    console.log(e.target.id);
    let meal = window.location.pathname.split("/")[2]; // checking by url subpath
    let obj = {};
    let foodServe = e.target.value;
    obj[meal] = [{ foodServe: foodServe }];
    // when no state in Redux store, add first data
    if (this.props.recordServe == undefined) {
      this.props.updateDailyRecordServe(obj);
    } else {
      this.props.addRecordInputServe(obj);
    }
  };

  appendInput = () => {
    this.setState(prevState => ({
      addInputComponent: prevState.addInputComponent + 1
    }));
  };

  getAppendedComponents = () => {
    let addInputComponent = [];
    for (let i = 1; i < this.state.addInputComponent; i++) {
      addInputComponent.push(
        <form className="main-input">
          <input
            placeholder="輸入食物名稱"
            className="food-name"
            onChange={this.inputNameChange}
            id={i}
          ></input>
          <input
            placeholder="輸入食物份量（100g 為一份）"
            className="food-serve"
            onChange={this.inputServeChange}
            id={"-" + i}
          ></input>
          <img src={Delete} className="delete-button"></img>
        </form>
      );
    }
    return addInputComponent;
  };

  sendDataToFirebase = e => {
    e.preventDefault();
    console.log(this.props);
    let currentState = this.props;
    let stateName = this.props.recordName;
    let stateServe = this.props.recordServe;

    this.props.sendDataToFirebase(stateName, stateServe);
  };

  render() {
    return (
      <div className="main-form">
        <form className="main-input">
          <input
            placeholder="輸入食物名稱"
            className="food-name"
            onChange={this.inputNameChange}
            id="0"
          ></input>
          <input
            placeholder="輸入食物份量（100g 為一份）"
            className="food-serve"
            onChange={this.inputServeChange}
            id="-0"
          ></input>
          <img src={Delete} className="delete-button"></img>
        </form>
        {this.getAppendedComponents()}
        <button className="add-input" onClick={this.appendInput}>
          新增欄位
        </button>
        <button className="add-record" onClick={this.sendDataToFirebase}>
          新增紀錄
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    date: new Date().toLocaleDateString(),
    meals: state.daily.meals,
    record: state.daily.record,
    recordName: state.daily.recordName,
    recordServe: state.daily.recordServe
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // create a method
    addRecordInputName: nextInput => {
      dispatch(addRecordInputName(nextInput));
    },
    addRecordInputServe: nextInput => {
      dispatch(addRecordInputServe(nextInput));
    },
    sendDataToFirebase: (stateName, stateServe) => {
      dispatch(sendDataToFirebase(stateName, stateServe));
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
