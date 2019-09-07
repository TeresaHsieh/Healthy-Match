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

export const adjustRecordInputName = (adjustIndex, newInputName) => {
  return {
    type: "ADJUST_RECORD_INPUT_NAME",
    adjustIndex,
    newInputName
  };
};

export const adjustRecordInputServe = (adjustIndex, newInputServe) => {
  return {
    type: "ADJUST_RECORD_INPUT_SERVE",
    adjustIndex,
    newInputServe
  };
};

export const sendDataToFirebase = (stateName, stateServe) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let meal = window.location.pathname.split("/")[2];
    let mealString = meal.toString();

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1; // if no plus one, the result would be August when expected September
    let day = today.getDate();

    let yearString = year.toString();
    let monthString = month.toString();
    let dayString = day.toString();
    let dateString = yearString + monthString + dayString;

    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("member")
      .doc("Teresa850506")
      .collection(dateString)
      .doc(meal)
      // use "add" for collection, use set for document
      .set({
        Name: stateName,
        Serve: stateServe
      })
      .then(() => {
        dispatch({ type: "SEND_DATA_TO_FIREBASE", stateName, stateServe });
      });
  };
};
