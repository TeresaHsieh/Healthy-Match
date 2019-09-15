// ===== Component: SignIn ========
export const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";

export const LOGIN_ERROR = "auth/LOGIN_ERROR";

// ===== Component: ProteinCharts ========
export const CHECK_FIRESTORE_NUTRITION_RECORD =
  "daily/CHECK_FIRESTORE_NUTRITION_RECORD";

// ===== Component: MainForm ========
// search
export const SEARCH_KEYWORDS = "daily/SEARCH_KEYWORDS";

// records
export const UPDATE_DAILY_RECORDS_NAME = "daily/UPDATE_DAILY_RECORDS_NAME";
export const UPDATE_DAILY_RECORDS_SERVE = "daily/UPDATE_DAILY_RECORDS_SERVE";

// add more record input (name and serve)
export const ADD_RECORD_INPUT_NAME = "daily/ADD_RECORD_INPUT_NAME";
export const ADD_RECORD_INPUT_SERVE = "daily/ADD_RECORD_INPUT_SERVE";

// adjustify previous record input (name and serve)
export const ADJUST_RECORD_INPUT_NAME = "daily/ADJUST_RECORD_INPUT_NAME";
export const ADJUST_RECORD_INPUT_SERVE = "daily/ADJUST_RECORD_INPUT_SERVE";

// add daily record => send to firebase
export const SEND_DATA_TO_FIREBASE = "daily/SEND_DATA_TO_FIREBASE";
