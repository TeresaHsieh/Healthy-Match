const initState = {
  authError: null
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("login error");
      return {
        ...state,
        authError: "Login Failed"
      };
    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        authError: null
      };
    case "SIGNOUT_SUCCESS":
      console.log("signout success");
      return state;
    case "SIGNUP_SUCCESS":
      console.log("signup success");
      return {
        ...state,
        authError: null
      };
    case "SIGNUP_ERROR":
      console.log("signup error");
      return {
        ...state,
        authError: action.err.message
      };
    case "CHECK_USER_INFO":
      return {
        ...state,
        userInfo: action.UserInfo
      };

    case "UPDATE_INFO_TO_FIRESTORE":
      return {
        ...state,
        userInfo: action.wholeState
      };

    case "SENT_LAST_IMG_TO_REDUX_STORE":
      return {
        ...state,
        LastIMG: action.LastIMG
      };

    case "SENT_DESCRIPTION_TO_REDUX_STORE":
      return {
        ...state,
        description: action.stateDescription
      };

    default:
      return state;
  }
};
export default authReducer;
