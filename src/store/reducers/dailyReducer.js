// import * as ActionTypes from "../actions/actionTypes";

const initState = {
  date: new Date().toLocaleDateString(),
  meals: "breakfast" // status default is breakfast
};

const dailyReducer = (state = initState, action) => {
  let meal = state.meals;
  switch (action.type) {
    case "UPDATE_DAILY_RECORDS_NAME":
      return {
        ...state,
        recordName: action.newRecord
      };
    case "UPDATE_DAILY_RECORDS_SERVE":
      return {
        ...state,
        recordServe: action.newRecord
      };

    case "ADD_RECORD_INPUT_NAME":
      return {
        ...state,
        recordName: state.recordName.concat(action.nextInputName)
      };
    case "ADD_RECORD_INPUT_SERVE":
      return {
        ...state,
        recordServe: state.recordServe.concat(action.nextInputServe)
      };

    case "ADJUST_RECORD_INPUT_NAME":
      let names = state.recordName.slice();
      /*
      for (let i = 0; i < state.recordName.length; i++) {
        names[i] = state.recordName[i];
      }
      */
      names.splice(action.adjustIndex, 1, action.newInputName);
      return {
        ...state,
        recordName: names
      };

    case "ADJUST_RECORD_INPUT_SERVE":
      let serves = state.recordServe.slice();
      serves.splice(action.adjustIndex, 1, action.newInputServe);
      return {
        ...state,
        recordServe: serves
      };

    case "SEND_DATA_TO_FIREBASE":
      return {
        ...state,
        recordName: state.recordName,
        recordServe: state.recordServe
      };

    case "ADD_RECORD_INPUT_ERR":
      console.log("add input error", action.err);
      return state;
    default:
      return state;
  }
};

export default dailyReducer;
