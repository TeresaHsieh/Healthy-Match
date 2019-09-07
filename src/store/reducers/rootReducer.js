import memberReducer from "./memberReducer";
import dailyReducer from "./dailyReducer";
import { firestoreReducer } from "redux-firestore"; // sync firestore data to our state

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  member: memberReducer,
  daily: dailyReducer,
  firestore: firestoreReducer
});

export default rootReducer;
