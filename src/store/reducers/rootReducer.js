import dailyReducer from "./dailyReducer";
import authReducer from "./authReducer";
import { firebaseReducer } from "react-redux-firebase"; // sync firestore data to our state
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  daily: dailyReducer,
  firebase: firebaseReducer
});

export default rootReducer;
