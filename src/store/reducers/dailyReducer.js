// import * as ActionTypes from "../actions/actionTypes";

const initState = {
  date: new Date().toLocaleDateString(),
  meals: "breakfast" // status default is breakfast
  //   breakfast: [
  //     { 全穀雜糧: "白飯", 份量: "3" },
  //     { 蔬菜: "青江菜", 份量: "3" },
  //     { 蛋豆魚肉: "鱈魚", 份量: "3" },
  //     { 水果: "葡萄", 份量: "3" },
  //     { 水與乳品: "優酪乳", 份量: "3" },
  //     { 油脂堅果: "核桃", 份量: "3" }
  //   ],
  //   lunch: [
  //     { 全穀雜糧: "白飯", 份量: "3" },
  //     { 蔬菜: "青江菜", 份量: "3" },
  //     { 蛋豆魚肉: "鱈魚", 份量: "3" },
  //     { 水果: "葡萄", 份量: "3" },
  //     { 水與乳品: "優酪乳", 份量: "3" },
  //     { 油脂堅果: "核桃", 份量: "3" }
  //   ],
  //   dinner: [
  //     { 全穀雜糧: "白飯", 份量: "3" },
  //     { 蔬菜: "青江菜", 份量: "3" },
  //     { 蛋豆魚肉: "鱈魚", 份量: "3" },
  //     { 水果: "葡萄", 份量: "3" },
  //     { 水與乳品: "優酪乳", 份量: "3" },
  //     { 油脂堅果: "核桃", 份量: "3" }
  //   ],
  //   snack: [
  //     { 全穀雜糧: "白飯", 份量: "3" },
  //     { 蔬菜: "青江菜", 份量: "3" },
  //     { 蛋豆魚肉: "鱈魚", 份量: "3" },
  //     { 水果: "葡萄", 份量: "3" },
  //     { 水與乳品: "優酪乳", 份量: "3" },
  //     { 油脂堅果: "核桃", 份量: "3" }
  //   ]
};

const dailyReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_DAILY_RECORDS_NAME":
      return {
        ...state,
        recordName: action.newRecord
      };
    case "UPDATE_DAILY_RECORDS_SERVE":
      return {
        ...state,
        recordServe: action.newRecord
      };
    case "ADD_RECORD_INPUT":
      console.log(action.inputName);
      console.log(action.inputServe);

      console.log(state);
      let meal = state.meals;
      return {
        ...state,
        recordName: state.recordName[meal].concat(action.inputName),
        recordServe: state.recordServe[meal].concat(action.inputServe)
      };
    case "SEND_DATA_TO_FIREBASE":
      return {
        record: action.wholeState
      };
    case "ADD_RECORD_INPUT_ERR":
      console.log("add input error", action.err);
      return state;
    default:
      return state;
  }
};

export default dailyReducer;
