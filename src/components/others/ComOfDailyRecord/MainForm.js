import React from "react";
import { connect } from "react-redux";
import AppendInput from "../ComOfDailyRecord/AppendInput";

// App Components and Actions
import { addRecordInputName } from "../../../store/actions/dailyAction";
import { addRecordInputServe } from "../../../store/actions/dailyAction";
import { sendDataToFirebase } from "../../../store/actions/dailyAction";
import { updateDailyRecordName } from "../../../store/actions/dailyAction";
import { updateDailyRecordServe } from "../../../store/actions/dailyAction";
import { adjustRecordInputName } from "../../../store/actions/dailyAction";
import { adjustRecordInputServe } from "../../../store/actions/dailyAction";
import { deleteRecord } from "../../../store/actions/dailyAction";

import { searchKeywords } from "../../../store/actions/dailyAction";
import Delete from "../../../imgs/delete.png";
import Add from "../../../imgs/add.png";
import Food from "../../../imgs/salad.png";

class MainForm extends React.Component {
  constructor() {
    super();
    this.state = {
      addInputComponent: 0,
      showSuggestion: false
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
    let adjustIndex = Number(e.target.id);
    let meal = window.location.pathname.split("/")[2]; // checking by url subpath
    let obj = {};
    let foodName = e.target.value;
    // avoid onBlur with no data, empty input shouldn't be save into the data store
    if (foodName.trim() !== "") {
      // when no state in Redux store, add first data
      if (this.props.recordName === undefined) {
        console.log("first");
        obj = [{ foodName: foodName }];
        this.props.updateDailyRecordName(obj);
      } else {
        // if input's value isn't empty, check if the data is rewriting the previous answer
        if (
          foodName !== this.props.recordName[adjustIndex] &&
          this.props.recordName[adjustIndex] !== undefined
        ) {
          console.log("更新");
          obj = { foodName: foodName };
          this.props.adjustRecordInputName(adjustIndex, obj); // 寫更新的方法
        } else if (this.props.recordName[adjustIndex] === undefined) {
          console.log("新增一筆");
          obj = [{ foodName: foodName }];
          this.props.addRecordInputName(obj);
        }
      }
    }
  };

  inputServeChange = e => {
    console.log(e.target.id);
    if (!isNaN(e.target.value)) {
      let adjustIndex = Number(e.target.id);
      let meal = window.location.pathname.split("/")[2]; // checking by url subpath
      let obj = {};
      let foodServe = e.target.value;
      if (foodServe.trim() !== "") {
        // when no state in Redux store, add first data
        if (this.props.recordServe == undefined) {
          obj = [{ foodServe: foodServe }];
          this.props.updateDailyRecordServe(obj);
        } else {
          if (
            foodServe !== this.props.recordServe[adjustIndex] &&
            this.props.recordServe[adjustIndex] !== undefined
          ) {
            console.log("更新");
            obj = { foodServe: foodServe };
            this.props.adjustRecordInputServe(adjustIndex, obj); // 寫更新的方法
          } else if (this.props.recordServe[adjustIndex] === undefined) {
            console.log("新增一筆");
            obj = [{ foodServe: foodServe }];
            this.props.addRecordInputServe(obj);
          }
        }
      }
    } else {
      alert("份數請填寫數字！");
    }
  };

  deleteRecord = e => {
    console.log(e.target.id);
    this.props.deleteRecord(e.target.id);
  };

  appendInput = () => {
    if (
      this.props.recordName === undefined &&
      this.props.recordServe === undefined
    ) {
      alert(" please add your first data!");
    } else if (
      this.props.recordName === undefined ||
      this.props.recordServe === undefined
    ) {
      alert("some info is missing ~!");
    } else if (this.props.recordName.length !== this.props.recordServe.length) {
      alert("some info is missing ~!");
    } else {
      this.setState(prevState => ({
        addInputComponent: prevState.addInputComponent + 1
      }));
    }
  };

  getAppendedComponents = () => {
    const showSuggestion = this.state.showSuggestion;
    let suggestion;

    if (showSuggestion && this.props.keywords !== undefined) {
      suggestion = (
        <div className="turnOffDiv" onClick={this.hideSuggestion}>
          <ul>
            {this.props.keywords.map(food => (
              <li className="eachSuggestion">{food}</li>
            ))}
          </ul>
        </div>
      );
    }
    let addInputComponent = [];
    for (let i = 1; i < this.state.addInputComponent; i++) {
      addInputComponent.push(
        <form className="main-input">
          <img src={`/${Food}`} className="food-icon" id="0"></img>

          <input
            placeholder="輸入食物名稱"
            className="food-name"
            onBlur={this.inputNameChange}
            onChange={this.searchKeywords}
            onKeyUp={this.showKeywords}
            id={i}
          ></input>
          <div className="searchSuggestion" id={i}>
            {suggestion}
          </div>

          <input
            placeholder="輸入食物份量（100g 為一份）"
            className="food-serve"
            onBlur={this.inputServeChange}
            id={i}
            type="number"
          ></input>
          <img
            src={`/${Delete}`}
            className="delete-button"
            id={i}
            onClick={this.deleteRecord}
          ></img>
        </form>
      );
    }
    return addInputComponent;
  };

  sendDataToFirebase = e => {
    e.preventDefault();
    let userUID = this.props.auth.uid;
    let currentState = this.props;
    let stateName = this.props.recordName;
    let stateServe = this.props.recordServe;

    this.props.sendDataToFirebase(stateName, stateServe, userUID);

    // after sending data, empty all the input and cut down the append inputs

    this.setState({
      addInputComponent: 0
    });
  };

  searchKeywords = e => {
    console.log("searching keywords");
    this.props.searchKeywords(e.target.value);
  };

  showKeywords = e => {
    if (e.target.value.length !== 0) {
      if (this.props.keywords.length !== 0) {
        this.setState({
          showSuggestion: true
        });
      }
    } else {
      this.setState({
        showSuggestion: false
      });
    }
  };

  hideSuggestion = e => {
    this.setState({
      showSuggestion: false
    });
  };

  // componentDidMount() {
  //   document.addEventListener("mousedown", this.hideSuggestion);
  // }

  render() {
    const showSuggestion = this.state.showSuggestion;
    let suggestion;

    if (showSuggestion && this.props.keywords !== undefined) {
      suggestion = (
        <div className="turnOffDiv" onClick={this.hideSuggestion}>
          <ul>
            {this.props.keywords.map(food => (
              <li className="eachSuggestion">{food}</li>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <div className="main-form">
        <form className="main-input">
          <img src={`/${Food}`} className="food-icon" id="0"></img>
          <input
            placeholder="輸入食物名稱"
            className="food-name"
            onBlur={this.inputNameChange}
            onChange={this.searchKeywords}
            onKeyUp={this.showKeywords}
            // value={this.state.originalInput}
            id="0"
          ></input>
          <div className="searchSuggestion">{suggestion}</div>
          <input
            placeholder="輸入食物份量（100g 為一份）"
            className="food-serve"
            onBlur={this.inputServeChange}
            // value={this.state.originalInput}
            id="0"
            type="number"
          ></input>
          <img
            src={`/${Delete}`}
            className="delete-button"
            onClick={this.deleteRecord}
            id="0"
          ></img>
        </form>
        {this.getAppendedComponents()}
        <div className="add-input">
          <img
            src={`/${Add}`}
            className="add-button"
            onClick={this.appendInput}
          ></img>
          <p className="add-input-word" onClick={this.appendInput}>
            新增欄位
          </p>
        </div>
        {/* <button className="add-input" onClick={this.appendInput}> */}
        {/* </button> */}
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
    recordServe: state.daily.recordServe,
    keywords: state.daily.keywords,
    auth: state.firebase.auth
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
    sendDataToFirebase: (stateName, stateServe, userUID) => {
      dispatch(sendDataToFirebase(stateName, stateServe, userUID));
    },
    updateDailyRecordName: newRecord => {
      dispatch(updateDailyRecordName(newRecord));
    },
    updateDailyRecordServe: newRecord => {
      dispatch(updateDailyRecordServe(newRecord));
    },
    adjustRecordInputName: (adjustIndex, newInputName) => {
      dispatch(adjustRecordInputName(adjustIndex, newInputName));
    },
    adjustRecordInputServe: (adjustIndex, newInputServe) => {
      dispatch(adjustRecordInputServe(adjustIndex, newInputServe));
    },
    searchKeywords: keywords => {
      dispatch(searchKeywords(keywords));
    },
    deleteRecord: objectIndex => {
      dispatch(deleteRecord(objectIndex));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainForm);
