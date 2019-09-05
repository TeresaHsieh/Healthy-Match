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

export const addRecordInput = (inputName, inputServe) => {
  return {
    type: "ADD_RECORD_INPUT",
    inputName,
    inputServe
  };
};

export const sendDataToFirebase = wholeState => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let meal = window.location.pathname.split("/")[2];
    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("member")
      .doc("member")
      .collection(meal)
      .add({
        [meal]: wholeState,
        createAt: new Date()
      })
      .then(() => {
        dispatch({ type: "SEND_DATA_TO_FIREBASE", wholeState });
      });
  };
};
