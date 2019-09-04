import memberReducer from "./memberReducer";
import dailyReducer from "./dailyReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  member: memberReducer,
  daily: dailyReducer
});

export default rootReducer;
