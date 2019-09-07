import { firestore } from "firebase";

// import * as ActionTypes from "../actions/actionTypes";

// check Firestore Record when reload the page and have seperate input
export const checkFirestoreRecord = previousRecord => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // type: "CHECK_FIRESTORE_RECORD",
    // previousRecord

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

    let theRecord = firestore
      .collection("member")
      .doc("3Smynu8UzW2gPvJrZYOZ")
      .collection(dateString)
      .doc(meal);

    theRecord
      .get()
      .then(function(doc) {
        console.log(dateString, meal);
        if (doc.exists) {
          console.log("predata!:" + previousRecord);
          console.log("Document data:", doc.data());
          console.log(doc.data().Name, doc.data().Serve);
          let prevName = doc.data().Name;
          let prevServe = doc.data().Serve;
          dispatch({ type: "CHECK_FIRESTORE_RECORD", prevName, prevServe });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  };
};

// =================================================

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

    // check if firestore has record, if there are some previous record, then push new data

    let theRecord = firestore
      .collection("member")
      .doc("3Smynu8UzW2gPvJrZYOZ")
      .collection(dateString)
      .doc(meal);

    theRecord.get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        console.log(doc.data().Name, doc.data().Serve);
        console.log(doc.data().Name);
        console.log(doc.data().Serve);
        let prevName = doc.data().Name;
        let prevServe = doc.data().Serve;
        let combineName = stateName.concat(prevName);
        let combineServe = stateServe.concat(prevServe);
        firestore
          .collection("member")
          .doc("3Smynu8UzW2gPvJrZYOZ")
          .collection(dateString)
          .doc(meal)
          // use "add" for collection, use set for document
          .set({
            Name: combineName,
            Serve: combineServe
          })
          .then(() => {
            dispatch({ type: "SEND_DATA_TO_FIREBASE", stateName, stateServe });
          });
      } else {
        // doc.data() will be undefined in this case
        console.log("No previous document!");
        firestore
          .collection("member")
          .doc("3Smynu8UzW2gPvJrZYOZ")
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
      }
    });
  };
};
