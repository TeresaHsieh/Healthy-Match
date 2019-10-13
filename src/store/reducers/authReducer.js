const initState = {
  authError: null
};
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log(action.err.message);
      return {
        ...state,
        authError: "Login Failed",
        loginError: action.err.message
      };

    case "LOGIN_SUCCESS":
      return {
        ...state,
        authError: null
      };

    case "SIGNOUT_SUCCESS":
      return state;

    case "SIGNUP_SUCCESS":
      return {
        ...state,
        authError: null
      };

    case "SIGNUP_ERROR":
      console.log(action.err.message);
      return {
        ...state,
        authError: action.err.message,
        signupError: action.err.message
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

    case "GET_CONTRIBUTION_DETAILS":
      return {
        ...state,
        contributionDetails: action.contributionDetail
      };

    case "REMOVE_IMG_AND_DESCRIPTION":
      console.log("進到reducer");
      return {
        ...state,
        LastIMG: undefined,
        description: undefined
      };

    default:
      return state;
  }
};
export default authReducer;
