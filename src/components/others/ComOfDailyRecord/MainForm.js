// All imports
import React, { createRef, useRef } from "react";
import { connect } from "react-redux";

// App Components and Actions
import { addRecordInputName } from "../../../store/actions/dailyAction";
import { addRecordInputServe } from "../../../store/actions/dailyAction";
import { sendDataToFirebase } from "../../../store/actions/dailyAction";
import { updateDailyRecordName } from "../../../store/actions/dailyAction";
import { updateDailyRecordServe } from "../../../store/actions/dailyAction";
import { adjustRecordInputName } from "../../../store/actions/dailyAction";
import { adjustRecordInputServe } from "../../../store/actions/dailyAction";
import { deleteRecord } from "../../../store/actions/dailyAction";
import { changeInputByKeywords } from "../../../store/actions/dailyAction";
import { searchKeywords } from "../../../store/actions/dailyAction";
import { clearValues } from "../../../store/actions/dailyAction";
import Add from "../../../imgs/add.png";
import Food from "../../../imgs/salad.png";
import EatingMatch from "../../../imgs/eating-match.png";

class MainForm extends React.Component {
  constructor() {
    super();
    this.state = {
      addInputComponent: 0,
      showSuggestion: false,
      openDropdownlist: false,
      openRecordSuccessfulBox: false
    };
    this.nameInput = React.createRef();
    this.serveInput = React.createRef();
    this.otherServeInput = React.createRef();
    this.areaOutsideDiv = React.createRef();
  }

  inputNameChange = e => {
    let adjustIndex = Number(e.target.id);
    let meal = window.location.pathname.split("/")[2]; // checking by url subpath
    let obj = {};
    let foodName = e.target.value;
    // avoid onBlur with no data, empty input shouldn't be save into the data store
    if (foodName.trim() !== "") {
      // when no state in Redux store, add first data
      if (this.props.recordName === undefined) {
        //first
        obj = [{ foodName: foodName }];
        this.props.updateDailyRecordName(obj);
      } else {
        // if input's value isn't empty, check if the data is rewriting the previous answer
        if (
          foodName !== this.props.recordName[adjustIndex] &&
          this.props.recordName[adjustIndex] !== undefined
        ) {
          //update
          obj = { foodName: foodName };
          this.props.adjustRecordInputName(adjustIndex, obj);
        } else if (this.props.recordName[adjustIndex] === undefined) {
          //add
          obj = [{ foodName: foodName }];
          this.props.addRecordInputName(obj);
        }
      }
    }
  };

  inputServeChange = e => {
    if (!isNaN(e.target.value)) {
      let adjustIndex = Number(e.target.id);
      let meal = window.location.pathname.split("/")[2]; // checking by url subpath
      let obj = {};
      let foodServe = e.target.value.replace(/[^0-9]+/g, "");
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
            //update
            obj = { foodServe: foodServe };
            this.props.adjustRecordInputServe(adjustIndex, obj);
          } else if (this.props.recordServe[adjustIndex] === undefined) {
            //add
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

  handleClickAway = () => {
    this.setState({ openDropdownlist: true });
  };

  getAppendedComponents = () => {
    const showSuggestion = this.state.showSuggestion;
    let suggestion;

    if (showSuggestion && this.props.keywords !== undefined) {
      suggestion = (
        <div className="turnOffDiv">
          <ul ref={node => (this.areaOutsideDiv = node)}>
            {this.props.keywords.map(food => (
              <li
                className="eachSuggestion"
                onClick={e => {
                  this.setInput(e);
                }}
              >
                {food}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    let addInputComponent = [];
    for (let i = 1; i < this.state.addInputComponent; i++) {
      addInputComponent.push(
        <form className="main-input" id={i}>
          <img src={`/${Food}`} className="food-icon" id={i}></img>

          <input
            placeholder="輸入食物名稱"
            className="food-name"
            onBlur={this.inputNameChange}
            onChange={this.searchKeywords}
            onKeyUp={this.showKeywords}
            id={i}
          ></input>
          <div
            className="searchSuggestion"
            id={i}
            style={this.state.onChangeId == i ? {} : { display: "none" }}
          >
            {suggestion}
          </div>

          <input
            placeholder="輸入食物份量（100g 為一份）"
            className="food-serve"
            onBlur={this.inputServeChange}
            id={i}
            type="number"
            min="0"
            ref={this.otherServeInput}
          ></input>
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
    this.setState({
      addInputComponent: 0,
      openRecordSuccessfulBox: true
    });
    let emptyValue = [];
    this.props.clearValues(emptyValue);
    this.nameInput.current.value = "";
    this.serveInput.current.value = "";

    setTimeout(
      function() {
        this.setState({ openRecordSuccessfulBox: false });
      }.bind(this),
      2000
    );
  };

  searchKeywords = e => {
    this.props.searchKeywords(e.target.value);
    this.setState({
      onChangeId: e.target.id
    });
  };

  showKeywords = e => {
    if (e.target.value.length !== 0) {
      this.setState({
        showSuggestion: true
      });
    } else {
      this.setState({
        showSuggestion: false
      });
    }
  };

  componentDidMount() {
    document.addEventListener("click", this.hideSuggestion);
    let firstServeInput = this.serveInput.current;
    firstServeInput.addEventListener("keydown", function(e) {
      // prevent: "e", "=", ",", "-", "."
      if ([69, 187, 188, 189, 190].includes(e.keyCode)) {
        e.preventDefault();
      }
    });
  }

  componentDidUpdate = () => {
    if (this.otherServeInput.current) {
      let otherServeInput = this.otherServeInput.current;
      otherServeInput.addEventListener("keydown", function(e) {
        // prevent: "e", "=", ",", "-", "."
        if ([69, 187, 188, 189, 190].includes(e.keyCode)) {
          e.preventDefault();
        }
      });
    }
  };

  hideSuggestion = e => {
    if (this.areaOutsideDiv.current.contains(e.target)) {
      // Clicked in box
      this.setState({
        showSuggestion: false
      });
    } else {
      // Clicked outside the box
      this.setState({
        showSuggestion: false
      });
    }
  };

  setInput = e => {
    let arrayObjectindex =
      e.currentTarget.parentNode.parentNode.parentNode.parentNode.childNodes[1]
        .id;
    let keywordsName = e.currentTarget.innerText;
    e.currentTarget.parentNode.parentNode.parentNode.parentNode.childNodes[1].value = keywordsName;

    let obj = { foodName: keywordsName };
    this.props.adjustRecordInputName(arrayObjectindex, obj); // 寫更新的方法
  };

  render() {
    const showSuggestion = this.state.showSuggestion;
    let suggestion;

    if (showSuggestion && this.props.keywords !== undefined) {
      suggestion = (
        <div className="turnOffDiv">
          <ul ref={this.areaOutsideDiv}>
            {this.props.keywords.map(food => (
              <li
                className="eachSuggestion"
                onClick={e => {
                  this.setInput(e);
                }}
              >
                {food}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    const openRecordSuccessfulBox = this.state.openRecordSuccessfulBox;
    return (
      <div className="main-form">
        <form className="main-input" id="0">
          <img src={`/${Food}`} className="food-icon" id="0"></img>
          <input
            placeholder="輸入食物名稱"
            className="food-name"
            onBlur={this.inputNameChange}
            onChange={this.searchKeywords}
            onKeyUp={this.showKeywords}
            ref={this.nameInput}
            id="0"
          ></input>
          <div
            className="searchSuggestion"
            style={this.state.onChangeId == 0 ? {} : { display: "none" }}
          >
            {suggestion}
          </div>
          <input
            placeholder="輸入食物份量（100g 為一份）"
            className="food-serve"
            onBlur={this.inputServeChange}
            id="0"
            type="number"
            min="0"
            ref={this.serveInput}
          ></input>
        </form>
        {this.getAppendedComponents()}
        <div className="add-input">
          <img
            src={`/${Add}`}
            className="add-button"
            onClick={this.appendInput}
          ></img>
          <p className="add-input-word" onClick={this.appendInput}>
            新增輸入欄位
          </p>
        </div>
        <button className="add-record" onClick={this.sendDataToFirebase}>
          <span>送出紀錄</span>
        </button>
        {openRecordSuccessfulBox ? (
          <div className="backgroundSentRecordSuccess">
            <div className="sentRecordSuccessDetail">
              <img src={`/${EatingMatch}`} className="eating-match" />
              <p>飲食紀錄已經成功送出囉！</p>
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
    },
    clearValues: emptyValue => {
      dispatch(clearValues(emptyValue));
    },
    changeInputByKeywords: (arrayObjectindex, keywordsName) => {
      dispatch(changeInputByKeywords(arrayObjectindex, keywordsName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainForm);
