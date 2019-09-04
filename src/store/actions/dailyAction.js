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
