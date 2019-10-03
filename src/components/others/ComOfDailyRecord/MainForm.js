//==============================================================================
//==============================================================================
//==============================================================================

// import React from "react";
// import { connect } from "react-redux";
// import AppendInput from "../ComOfDailyRecord/AppendInput";

// // App Components and Actions
// import { addRecordInputName } from "../../../store/actions/dailyAction";
// import { addRecordInputServe } from "../../../store/actions/dailyAction";
// import { sendDataToFirebase } from "../../../store/actions/dailyAction";
// import { updateDailyRecordName } from "../../../store/actions/dailyAction";
// import { updateDailyRecordServe } from "../../../store/actions/dailyAction";
// import { adjustRecordInputName } from "../../../store/actions/dailyAction";
// import { adjustRecordInputServe } from "../../../store/actions/dailyAction";
// import { deleteRecord } from "../../../store/actions/dailyAction";

// import { searchKeywords } from "../../../store/actions/dailyAction";
// import Delete from "../../../imgs/delete.png";
// import Add from "../../../imgs/add.png";
// import Food from "../../../imgs/salad.png";

// class MainForm extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       addInputComponent: 0,
//       showSuggestion: false
//     };
//   }
//   // submit state to the firebase
//   // addMealData = () => {
//   // return {
//   //   meals: meal.toString(),
//   //   meal: prevState.snack
//   // };
//   // 以下為上方 object 改寫
//   // let object = {};
//   // object.meals = meal.toString();
//   // object[meal] = prevState.snack;
//   // };

//   // change input, change data (state)
//   inputNameChange = e => {
//     console.log(e.target.id);
//     let adjustIndex = Number(e.target.id);
//     let meal = window.location.pathname.split("/")[2]; // checking by url subpath
//     let obj = {};
//     let foodName = e.target.value;
//     // avoid onBlur with no data, empty input shouldn't be save into the data store
//     if (foodName.trim() !== "") {
//       // when no state in Redux store, add first data
//       if (!this.state.recordName) {
//         console.log("first");
//         obj = [{ foodName: foodName, id: adjustIndex }];
//         this.setState({ recordName: obj });
//       } else {
//         // if input's value isn't empty, check if the data is rewriting the previous answer
//         if (this.state.recordName[adjustIndex] !== undefined) {
//           console.log("更新");
//           obj = { foodName: foodName, id: adjustIndex };
//           this.setState(prevState => {
//             let names = prevState.recordName.slice(); // create new array
//             names.splice(adjustIndex, 1, obj);
//             return {
//               recordName: names
//             };
//           });
//         } else if (this.state.recordName[adjustIndex] == undefined) {
//           console.log("新增一筆");
//           obj = [{ foodName: foodName, id: adjustIndex }];
//           this.setState(prevState => {
//             return {
//               recordName: prevState.recordName.concat(obj)
//             };
//           });
//         } else if (
//           this.state.recordName.length == this.state.recordServe.length &&
//           this.state.recordName &&
//           this.state.recordServe
//         ) {
//           console.log("近來");
//           this.setState(prevState => ({
//             addInputComponent: prevState.addInputComponent - 1
//           }));
//         }
//       }
//     } else {
//       alert("please complete the info filling");
//     }
//   };

//   inputServeChange = e => {
//     console.log(e.target.id);
//     if (!isNaN(e.target.value)) {
//       let adjustIndex = Number(e.target.id);
//       let meal = window.location.pathname.split("/")[2]; // checking by url subpath
//       let obj = {};
//       let foodServe = e.target.value;

//       if (foodServe.trim() !== "") {
//         // when no state in Redux store, add first data
//         if (!this.state.recordServe) {
//           obj = [{ foodServe: foodServe, id: adjustIndex }];
//           this.setState({ recordServe: obj });
//         } else {
//           console.log(adjustIndex);

//           if (
//             this.state.recordServe[adjustIndex] !== undefined &&
//             this.state.recordFood[adjustIndex] !== undefined
//           ) {
//             console.log("更新");
//             obj = { foodServe: foodServe, id: adjustIndex };
//             this.setState(prevState => {
//               let serves = prevState.recordServe.slice(); // create new array
//               serves.splice(adjustIndex, 1, obj);
//               return {
//                 recordServe: serves
//               };
//             });
//           } else if (this.state.recordServe[adjustIndex] === undefined) {
//             console.log("新增一筆");
//             console.log(foodServe);
//             obj = [{ foodServe: foodServe, id: adjustIndex }];
//             this.setState(prevState => {
//               console.log(prevState.recordName);
//               return {
//                 recordServe: prevState.recordServe.concat(obj),
//                 addInputComponent: prevState.addInputComponent - 1
//               };
//             });
//           } else if (
//             this.state.recordName.length == this.state.recordServe.length &&
//             this.state.recordName &&
//             this.state.recordServe
//           ) {
//             console.log("近來");
//             this.setState(prevState => ({
//               addInputComponent: prevState.addInputComponent - 1
//             }));
//           }
//         }
//       } else if (foodServe.trim() == "") {
//         alert("please complete the info filling");
//       } else {
//         alert("份數請填寫數字！");
//       }
//     }
//   };

//   deleteRecord = e => {
//     console.log("tttttt", e.target.id);
//     let deleteIndex = e.target.id;

//     this.setState(prevState => {
//       let newFoodName = prevState.recordName.filter(
//         item => item.id != deleteIndex
//       );
//       let newFoodServe = prevState.recordServe.filter(
//         item => item.id != deleteIndex
//       );
//       console.log("tttttt", newFoodName, newFoodServe);
//       return {
//         recordName: newFoodName,
//         recordServe: newFoodServe
//       };
//     });
//   };

//   appendInput = () => {
//     if (!this.state.recordName && !this.state.recordServe) {
//       alert(" please add your first data!");
//     } else if (
//       this.state.recordName == undefined ||
//       this.state.recordServe == undefined
//     ) {
//       alert("some info is missing ~!");
//     } else if (this.state.recordName.length !== this.state.recordServe.length) {
//       alert("some info is missing ~!");
//     } else {
//       this.setState(prevState => ({
//         addInputComponent: 1
//       }));
//     }
//   };

//   getAppendedComponents = () => {
//     const showSuggestion = this.state.showSuggestion;
//     let suggestion;

//     if (showSuggestion && this.props.keywords !== undefined) {
//       suggestion = (
//         <div className="turnOffDiv" onClick={this.hideSuggestion}>
//           <ul>
//             {this.props.keywords.map(food => (
//               <li className="eachSuggestion">{food}</li>
//             ))}
//           </ul>
//         </div>
//       );
//     }
//     let addInputComponent = [];

//     for (let i = 0; i < this.state.addInputComponent; i++) {
//       let radomID = parseInt(Math.random() * 1000000);
//       addInputComponent.push(
//         <form className="main-input">
//           <img src={`/${Food}`} className="food-icon" id={radomID}></img>

//           <input
//             placeholder="輸入食物名稱"
//             className="food-name"
//             onBlur={this.inputNameChange}
//             onChange={this.searchKeywords}
//             onKeyUp={this.showKeywords}
//             id={radomID}
//           ></input>
//           <div className="searchSuggestion" id={i}>
//             {suggestion}
//           </div>
//           <input
//             placeholder="輸入食物份量（100g 為一份）"
//             className="food-serve"
//             onBlur={this.inputServeChange}
//             id={radomID}
//             type="number"
//           ></input>
//           <img
//             src={`/${Delete}`}
//             className="delete-button"
//             id={radomID}
//             onClick={this.deleteRecord}
//           ></img>
//         </form>
//       );
//     }

//     return addInputComponent;
//   };

//   // sendDataToFirebase = e => {
//   //   e.preventDefault();
//   //   let userUID = this.props.auth.uid;
//   //   let currentState = this.props;
//   //   let stateName = this.props.recordName;
//   //   let stateServe = this.props.recordServe;

//   //   this.props.sendDataToFirebase(stateName, stateServe, userUID);

//   //   // after sending data, empty all the input and cut down the append inputs

//   //   this.setState({
//   //     addInputComponent: 0
//   //   });
//   // };

//   searchKeywords = e => {
//     console.log("searching keywords");
//     this.props.searchKeywords(e.target.value);
//   };

//   showKeywords = e => {
//     if (e.target.value.length !== 0) {
//       // if (this.props.keywords.length !== 0) {
//       this.setState({
//         showSuggestion: true
//       });
//       //}
//     } else {
//       this.setState({
//         showSuggestion: false
//       });
//     }
//   };

//   hideSuggestion = e => {
//     this.setState({
//       showSuggestion: false
//     });
//   };

//   componentDidMount() {
//     document.addEventListener("mousedown", this.hideSuggestion);
//   }

//   render() {
//     const showSuggestion = this.state.showSuggestion;
//     let suggestion;

//     if (showSuggestion && this.props.keywords !== undefined) {
//       suggestion = (
//         <div className="turnOffDiv" onClick={this.hideSuggestion}>
//           <ul>
//             {this.props.keywords.map(food => (
//               <li className="eachSuggestion">{food}</li>
//             ))}
//           </ul>
//         </div>
//       );
//     }

//     if (this.state.recordName && this.state.recordServe) {
//       let records = [];
//       if (this.state.recordName.length == this.state.recordServe.length) {
//         for (let i = 0; i < this.state.recordName.length; i++) {
//           records.push({
//             foodName: this.state.recordName[i].foodName,
//             foodServe: this.state.recordServe[i].foodServe
//           });
//           console.log("test", records);
//         }
//       } else if (this.state.recordName.length > this.state.recordServe.length) {
//         console.log("名字長");
//         // let plusEmpty = this.state.recordServe.slice();
//         // plusEmpty.push({ foodServe: "", id: "" });
//         let removeLast = this.state.recordName.slice();
//         removeLast.splice(Number(this.state.recordName.length) - 1, 1);
//         // console.log(plusEmpty);
//         console.log("hererer", removeLast);
//         for (let i = 0; i < this.state.recordServe.length; i++) {
//           records.push({
//             foodName: removeLast[i].foodName,
//             foodServe: this.state.recordServe[i].foodServe

//           });
//           console.log("test", records);
//         }
//       } else if (this.state.recordName.length < this.state.recordServe.length) {
//         console.log("份數長");
//         // let plusEmpty = this.state.recordName.slice();
//         // plusEmpty.push({ foodName: "", id: "" });
//         let removeLast = this.state.recordServe.slice();
//         removeLast.splice(Number(this.state.recordServe.length) - 1, 1);
//         console.log("hererer", removeLast);
//         for (let i = 0; i < this.state.recordName.length; i++) {
//           records.push({
//             foodName: this.state.recordName[i].foodName,
//             foodServe: removeLast[i].foodServe
//           });
//           console.log("test", records);
//         }
//       }
//       console.log("好多人", records);
//       const NEWinputs = records.map(records => {
//         const returnRecord = (
//           <div>
//             <img src={`/${Food}`} className="food-icon" id={records.id}></img>

//             <input
//               placeholder="輸入食物名稱"
//               className="food-name"
//               onBlur={this.inputNameChange}
//               onChange={this.searchKeywords}
//               onKeyUp={this.showKeywords}
//               value={records.foodName}
//               id={records.id}
//             ></input>

//             <div className="searchSuggestion">{suggestion}</div>
//             <input
//               placeholder="輸入食物份量（100g 為一份）"
//               className="food-serve"
//               onBlur={this.inputServeChange}
//               value={records.foodServe}
//               id={records.id}
//               type="number"
//             ></input>

//             <img
//               src={`/${Delete}`}
//               className="delete-button"
//               onClick={this.deleteRecord}
//               id={records.id}
//             ></img>
//           </div>
//         );

//         return returnRecord;
//       });
//       console.log("all", NEWinputs);
//       return (
//         <React.Fragment>
//           {NEWinputs}
//           {this.getAppendedComponents()}
//           <div className="add-input">
//             <img
//               src={`/${Add}`}
//               className="add-button"
//               onClick={this.appendInput}
//             ></img>
//             <p className="add-input-word" onClick={this.appendInput}>
//               新增欄位
//             </p>
//           </div>
//           <button className="add-record" onClick={this.sendDataToFirebase}>
//             新增紀錄
//           </button>
//         </React.Fragment>
//       );
//     } else {
//       return (
//         <div className="main-form">
//           <form className="main-input">
//             <img src={`/${Food}`} className="food-icon" id="0"></img>
//             <input
//               placeholder="輸入食物名稱"
//               className="food-name"
//               onBlur={this.inputNameChange}
//               onChange={this.searchKeywords}
//               onKeyUp={this.showKeywords}
//               // value={this.state.originalInput}
//               id="0"
//             ></input>
//             <div className="searchSuggestion">{suggestion}</div>
//             <input
//               placeholder="輸入食物份量（100g 為一份）"
//               className="food-serve"
//               onBlur={this.inputServeChange}
//               // value={this.state.originalInput}
//               id="0"
//               type="number"
//             ></input>
//             <img
//               src={`/${Delete}`}
//               className="delete-button"
//               onClick={this.deleteRecord}
//               id="0"
//             ></img>
//           </form>
//           {this.getAppendedComponents()}
//           <div className="add-input">
//             <img
//               src={`/${Add}`}
//               className="add-button"
//               onClick={this.appendInput}
//             ></img>
//             <p className="add-input-word" onClick={this.appendInput}>
//               新增欄位
//             </p>
//           </div>
//           <button className="add-record" onClick={this.sendDataToFirebase}>
//             新增紀錄
//           </button>
//         </div>
//       );
//     }
//   }
// }

// const mapStateToProps = state => {
//   return {
//     date: new Date().toLocaleDateString(),
//     meals: state.daily.meals,
//     record: state.daily.record,
//     recordName: state.daily.recordName,
//     recordServe: state.daily.recordServe,
//     keywords: state.daily.keywords,
//     auth: state.firebase.auth
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     // create a method
//     addRecordInputName: nextInput => {
//       dispatch(addRecordInputName(nextInput));
//     },
//     addRecordInputServe: nextInput => {
//       dispatch(addRecordInputServe(nextInput));
//     },
//     sendDataToFirebase: (stateName, stateServe, userUID) => {
//       dispatch(sendDataToFirebase(stateName, stateServe, userUID));
//     },
//     updateDailyRecordName: newRecord => {
//       dispatch(updateDailyRecordName(newRecord));
//     },
//     updateDailyRecordServe: newRecord => {
//       dispatch(updateDailyRecordServe(newRecord));
//     },
//     adjustRecordInputName: (adjustIndex, newInputName) => {
//       dispatch(adjustRecordInputName(adjustIndex, newInputName));
//     },
//     adjustRecordInputServe: (adjustIndex, newInputServe) => {
//       dispatch(adjustRecordInputServe(adjustIndex, newInputServe));
//     },
//     searchKeywords: keywords => {
//       dispatch(searchKeywords(keywords));
//     },
//     deleteRecord: objectIndex => {
//       dispatch(deleteRecord(objectIndex));
//     }
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(MainForm);
//==============================================================================
//==============================================================================

import React, { createRef, useRef } from "react";
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
import { changeInputByKeywords } from "../../../store/actions/dailyAction";

import { searchKeywords } from "../../../store/actions/dailyAction";
import { clearValues } from "../../../store/actions/dailyAction";

import Delete from "../../../imgs/delete.png";
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

  handleClickAway = () => {
    this.setState({ openDropdownlist: true });
  };

  getAppendedComponents = () => {
    const showSuggestion = this.state.showSuggestion;
    let suggestion;

    if (showSuggestion && this.props.keywords !== undefined) {
      suggestion = (
        // <ClickAwayListener onClickAway={this.handleClickAway}>
        //   <MenuList>
        //     {this.props.keywords.map(food => (
        //       <MenuItem className="eachSuggestion">{food}</MenuItem>
        //     ))}
        //   </MenuList>
        // </ClickAwayListener>
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
          {/* <img
            src={`/${Delete}`}
            className="delete-button"
            id={i}
            onClick={this.deleteRecord}
          ></img> */}
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
      addInputComponent: 0,
      openRecordSuccessfulBox: true
    });
    let emptyValue = [];
    this.props.clearValues(emptyValue);
    this.nameInput.current.value = "";
    this.serveInput.current.value = "";
    // () => {

    // };
    setTimeout(
      function() {
        this.setState({ openRecordSuccessfulBox: false });
      }.bind(this),
      2000
    );
  };

  searchKeywords = e => {
    console.log("searching keywords");
    this.props.searchKeywords(e.target.value);
    this.setState({
      onChangeId: e.target.id
    });
  };

  showKeywords = e => {
    if (e.target.value.length !== 0) {
      // if (this.props.keywords.length !== 0) {
      this.setState({
        showSuggestion: true
      });
      //}
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
      console.log("Clicked in box");
      this.setState({
        showSuggestion: false
      });
    } else {
      // Clicked outside the box
      console.log("Clicked outside the box");
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
    // this.setState({
    //   showSuggestion: false
    // });
    console.log(
      e.currentTarget.parentNode.parentNode.parentNode.parentNode.childNodes[1]
        .id,
      e.currentTarget.innerText
    );
    // this.props.changeInputByKeywords(arrayObjectindex, keywordsName);
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
                // onClick={this.state.onChangeId == i ? {} : { display: "none" }}
              >
                {food}
              </li>
            ))}
          </ul>
        </div>
        // <ClickAwayListener onClickAway={this.handleClickAway}>
        //   <MenuList>
        //     {this.props.keywords.map(food => (
        //       <MenuItem className="eachSuggestion">{food}</MenuItem>
        //     ))}
        //   </MenuList>
        // </ClickAwayListener>
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
            // value={this.state.originalInput}
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
            // value={this.state.originalInput}
            id="0"
            type="number"
            min="0"
            ref={this.serveInput}
          ></input>
          {/* <img
            src={`/${Delete}`}
            className="delete-button"
            onClick={this.deleteRecord}
            id="0"
          ></img> */}
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

// const Test = () => {
//   let handleClickAway = () => {
//     console.log("OPEN!");
//   };

//   return (
//     <ClickAwayListener onClickAway={handleClickAway}>
//       <MenuList>
//         <MenuItem className="eachSuggestion">a</MenuItem>
//         <MenuItem className="eachSuggestion">b</MenuItem>
//         <MenuItem className="eachSuggestion">c</MenuItem>
//         <MenuItem className="eachSuggestion">d</MenuItem>
//         <MenuItem className="eachSuggestion">e</MenuItem>
//       </MenuList>
//     </ClickAwayListener>
//   );
// };
