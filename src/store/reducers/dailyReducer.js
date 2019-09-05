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
    // case "ADD_RECORD_INPUT":
    //   console.log(action.inputName);
    //   console.log(action.inputServe);

    //   console.log(state);
    //   let meal = state.meals;
    //   return {
    //     ...state,
    //     recordName: state.recordName[meal].concat(action.inputName),
    //     recordServe: state.recordServe[meal].concat(action.inputServe)
    //   };

    case "ADD_RECORD_INPUT_NAME":
      return {
        ...state,
        recordName: state.recordName.concat(action.nextInputName)
        // recordName: state.recordName[meal].concat(action.nextInputName)
        // recordName: state.recordName[meal].splice(0, 0, action.nextInputName)
      };
    case "ADD_RECORD_INPUT_SERVE":
      return {
        ...state,
        recordServe: state.recordServe.concat(action.nextInputServe)
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
