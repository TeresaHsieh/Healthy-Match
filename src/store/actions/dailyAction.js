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
//     return {
//       type: "ADD_RECORD_INPUT",
//       inputName, inputServe
//     };
//   };

export const addRecordInput = (inputName, inputServe) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection("daily")
      .add({
        name: inputName,
        serve: inputServe,
        createAt: new Date()
      })
      .then(() => {
        dispatch({ type: "ADD_RECORD_INPUT", inputName, inputServe });
      })
      .catch(err => {
        dispatch({ type: "ADD_RECORD_INPUT_ERR", err });
      });
  };
};
