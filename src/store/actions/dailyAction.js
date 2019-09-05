import { firestore } from "firebase";

// import * as ActionTypes from "../actions/actionTypes";

// record --- action creator and action
export const updateDailyRecordName = newRecord => {
  return {
    type: "UPDATE_DAILY_RECORDS_NAME",
    newRecord
  };
};

export const updateDailyRecordServe = newRecord => {
  return {
    type: "UPDATE_DAILY_RECORDS_SERVE",
    newRecord
  };
};

// export const addRecordInput = (inputName, inputServe) => {
//   return {
//     type: "ADD_RECORD_INPUT",
//     inputName,
//     inputServe
//   };
// };

export const addRecordInputName = nextInputName => {
  return {
    type: "ADD_RECORD_INPUT_NAME",
    nextInputName
  };
};

export const addRecordInputServe = nextInputServe => {
  return {
    type: "ADD_RECORD_INPUT_SERVE",
    nextInputServe
  };
};

export const sendDataToFirebase = (stateName, stateServe) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let meal = window.location.pathname.split("/")[2];
    let mealString = meal.toString();
    let date = new Date();
    let dateString = date.toString();
    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("member")
      .doc("Teresa850506")
      .collection(dateString)
      .add({
        [meal + "Name"]: stateName,
        [meal + "Serve"]: stateServe
      })
      .then(() => {
        dispatch({ type: "SEND_DATA_TO_FIREBASE", stateName, stateServe });
      });
  };
};
