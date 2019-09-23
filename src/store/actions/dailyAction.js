import { firestore } from "firebase";
// import * as ActionTypes from "../actions/actionTypes";

export const searchKeywords = keyword => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();

    // check all food that correspond to keywords
    let keywords = [];
    if (keyword !== "") {
      let theRecord = firestore
        .collection("nutrition")
        .where("搜尋關鍵字", "array-contains", keyword)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            keywords.push(doc.id);
            console.log(doc.id);
          });
          console.log("i'm typing:", keyword);
          console.log(keywords);
          dispatch({ type: "SEARCH_KEYWORDS", keywords });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    }
  };
};

// 先寫期待的 result 形式（依照日期分類，把每天吃的各式營養加總）
// 把日期一樣的文件挑起來，找到裡面的細節（吃了什麼）去資料庫裡面抓出營養
// 把營養值乘上份數（這一樣要先把日期一樣的文件挑起來，找到裡面的細節（份數））
// 把上步驟的各式營養量塞到 result 的 object 裡面

// 會有重複算的問題，當一餐有吃兩種以上食物、份數的時候
// 乘上份數
// 知道什麼時候要停下來
// 時時刻刻注意「非同步的問題」
// 少吃某餐要是零（好像不用，因為都是用加總的）
// 注意現在抓的都是一個區間的量

export const checkFirestoreNutritionRecord = (startDate, endDate, userUID) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // step 1: find foods' name and serve in specific time
    let userUid = userUID.toString();
    console.log("surprise", userUid);
    const firestore = getFirestore();
    let allRecord = firestore // "allRecord" is all the data that happens in the giving inerval of time
      .collection("member")
      .doc(userUid)
      .collection("nutritionRecord")
      .where("Date", ">=", Number(startDate))
      .where("Date", "<=", Number(endDate));
    let names = [];

    let getNameNutrition = new Promise((resolve, reject) => {
      let theName = "";
      let theDate = [];
      let foodNumber = [];
      let data = [];
      let sum;
      let test = [];
      let teresa = [];

      let test_3 = [];
      allRecord
        .get()
        .then(mealTypes => {
          mealTypes.docs.forEach(mealAndNameTypes => {
            theName = mealAndNameTypes.get("Name"); // all foodName of the giving time
            theDate = mealAndNameTypes.get("Date");

            console.log("andyyyyyyyy", mealAndNameTypes);

            foodNumber.push(theName.length); // knowing the number of foods in daily
            const add = (a, b) => a + b;
            sum = foodNumber.reduce(add);

            theName.forEach(name => {
              let meal = {
                name: name,
                date: theDate
              };
              names.push(meal);
            });
          });
        })
        .then(() => {
          let loaded = 0;
          for (let i = 0; i < names.length; i++) {
            firestore
              .collection("nutrition")
              .doc(names[i].name.foodName)
              .get()
              .then(function(ref) {
                if (ref.exists) {
                  //test_3.push({ data: ref.data() });
                  test_3.push({ date: names[i].date, data: ref.data() });
                }
              })
              .then(() => {
                loaded++;
                if (loaded === names.length) {
                  resolve(test_3);
                }
              });
          }
        });
    });
    let serves = [];
    let getServe = new Promise((resolve, reject) => {
      allRecord.get().then(mealTypes => {
        mealTypes.docs.forEach(mealAndNameTypes => {
          let theServe = mealAndNameTypes.get("Serve");

          theServe.forEach(serve => {
            serves.push(Number(serve.foodServe));
          });
          resolve(serves);
        });
      });
    });

    let meals = [];
    let getMealType = new Promise((resolve, reject) => {
      allRecord.get().then(mealTypes => {
        mealTypes.docs.forEach(mealAndNameTypes => {
          let theMeal = mealAndNameTypes.get("Meal");
          let theName = mealAndNameTypes.get("Name");

          for (let t = 0; t < theName.length; t++) {
            meals.push(theMeal);
          }
        });
      });
      resolve(meals);
    });

    let foodNutrition;
    let check = [];
    let theDate;
    let data = {};
    let results = {};

    Promise.all([getNameNutrition, getServe, getMealType])
      .then(nutritionAndServes => {
        allRecord.get().then(mealTypes => {
          mealTypes.docs.forEach(mealAndNameTypes => {
            theDate = mealAndNameTypes.get("Date");
            if (!results[theDate]) {
              results[theDate] = {};
            }
          });
        });

        foodNutrition = nutritionAndServes[0];
        let foodServes = nutritionAndServes[1];

        for (let m = 0; m < foodNutrition.length; m++) {
          //for (let key in foodNutrition[m]) {
          // if data is an array, key will be the index number of element in it. if data is an object, key will be the key in it
          let yoyo = foodNutrition[m].data;

          for (let key in yoyo) {
            if (yoyo[key] != null && !isNaN(yoyo[key])) {
              yoyo[key] = yoyo[key] * foodServes[m];
            }
          }
        }
      })
      .then(() => {
        let yeah;
        let dateeee;

        for (let f = 0; f < foodNutrition.length; f++) {
          yeah = foodNutrition[f].data;
          dateeee = foodNutrition[f].date;

          for (let key in yeah) {
            if (
              yeah[key] != null &&
              !isNaN(yeah[key]) &&
              yeah[key] != undefined
            ) {
              if (!results[dateeee]) {
                results[dateeee] = {};
              }
              if (results[dateeee][key]) {
                results[dateeee][key] += yeah[key];
              } else {
                results[dateeee][key] = yeah[key];
              }
            }
          }
        }

        dispatch({
          type: "CHECK_FIRESTORE_NUTRITION_RECORD",
          results,
          names,
          serves,
          meals
        });
      });
  };
};
//==========================

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

export const sendDataToFirebase = (stateName, stateServe, userUID) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    let meal = window.location.pathname.split("/")[2];
    let mealString = meal.toString();
    let userUid = userUID.toString();
    console.log("UID", userUID);
    console.log("UID", userUid);
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1; // if no plus one, the result would be August when expected September
    let day = today.getDate();

    let yearString = year.toString();
    //let monthString = month.toString();
    //let dayString = day.toString();
    //let dateString = yearString + monthString + dayString;

    let monthString = "";

    if (month < 10) {
      monthString = "0" + month.toString();
    } else {
      monthString = month.toString();
    }

    let dayString = "";

    if (day < 10) {
      dayString = "0" + day.toString();
    } else {
      dayString = day.toString();
    }

    let dateString = yearString + monthString + dayString;
    // let dateString = "20190911";

    // make async call to database
    const firestore = getFirestore();

    // check if firestore has record, if there are some previous record, then push new data

    let theRecord = firestore
      .collection("member")
      .doc(userUid)
      .collection("nutritionRecord")
      .doc(dateString + meal);

    theRecord.get().then(function(doc) {
      // if (doc.exists) {
      //   let prevName = doc.data().Name;
      //   let prevServe = doc.data().Serve;
      //   let combineName = stateName.concat(prevName);
      //   let combineServe = stateServe.concat(prevServe);

      //   firestore
      //     .collection("member")
      //     .doc("3Smynu8UzW2gPvJrZYOZ")
      //     .collection("nutritionRecord")
      //     .doc(dateString + meal)
      //     // use "add" for collection, use set for document
      //     .set({
      //       Date: Number(dateString),
      //       // [mealString]: {
      //       Name: combineName,
      //       Serve: combineServe
      //       //  }
      //     })

      //     .then(() => {
      //       dispatch({ type: "SEND_DATA_TO_FIREBASE", stateName, stateServe });
      //     });
      // } else {
      //   // doc.data() will be undefined in this case
      //   console.log("No previous document!");
      //   firestore
      //     .collection("member")
      //     .doc("3Smynu8UzW2gPvJrZYOZ")
      //     .collection("nutritionRecord")
      //     .doc(dateString + meal)
      //     // use "add" for collection, use set for document
      //     .set({
      //       Date: Number(dateString),
      //       //[mealString]: {
      //       Name: stateName,
      //       Serve: stateServe
      //       // }
      //     })

      //     .then(() => {
      //       dispatch({ type: "SEND_DATA_TO_FIREBASE", stateName, stateServe });
      //     });
      // }

      //================================================================================================
      if (meal == "breakfast") {
        if (doc.exists) {
          console.log("see", doc);

          let prevName = doc.data().Name;
          let prevServe = doc.data().Serve;
          let combineName = stateName.concat(prevName);
          let combineServe = stateServe.concat(prevServe);
          console.log("series", prevName, prevServe, combineName, combineServe);

          firestore
            .collection("member")
            .doc(userUid)
            .collection("nutritionRecord")
            .doc(dateString + meal)
            // use "add" for collection, use set for document
            .set({
              Date: Number(dateString),
              Meal: "breakfast",
              Name: combineName,
              Serve: combineServe
              //  }
            })

            .then(() => {
              dispatch({
                type: "SEND_DATA_TO_FIREBASE",
                stateName,
                stateServe
              });
            });
        } else {
          // doc.data() will be undefined in this case
          console.log("No previous document!");
          firestore
            .collection("member")
            .doc(userUid)
            .collection("nutritionRecord")
            .doc(dateString + meal)
            // use "add" for collection, use set for document
            .set({
              Date: Number(dateString),
              Meal: "breakfast",
              Name: stateName,
              Serve: stateServe
            })

            .then(() => {
              dispatch({
                type: "SEND_DATA_TO_FIREBASE",
                stateName,
                stateServe
              });
            });
        }
      } else if (meal == "lunch") {
        if (doc.exists) {
          let prevName = doc.data().Name;
          let prevServe = doc.data().Serve;
          let combineName = stateName.concat(prevName);
          let combineServe = stateServe.concat(prevServe);

          firestore
            .collection("member")
            .doc(userUid)
            .collection("nutritionRecord")
            .doc(dateString + meal)
            // use "add" for collection, use set for document
            .set({
              Date: Number(dateString),
              Meal: "lunch",
              Name: combineName,
              Serve: combineServe
              //  }
            })

            .then(() => {
              dispatch({
                type: "SEND_DATA_TO_FIREBASE",
                stateName,
                stateServe
              });
            });
        } else {
          // doc.data() will be undefined in this case
          console.log("No previous document!");
          firestore
            .collection("member")
            .doc(userUid)
            .collection("nutritionRecord")
            .doc(dateString + meal)
            // use "add" for collection, use set for document
            .set({
              Date: Number(dateString),
              Meal: "lunch",
              Name: stateName,
              Serve: stateServe
              // }
            })

            .then(() => {
              dispatch({
                type: "SEND_DATA_TO_FIREBASE",
                stateName,
                stateServe
              });
            });
        }
      } else if (meal == "dinner") {
        if (doc.exists) {
          let prevName = doc.data().Name;
          let prevServe = doc.data().Serve;
          let combineName = stateName.concat(prevName);
          let combineServe = stateServe.concat(prevServe);

          firestore
            .collection("member")
            .doc(userUid)
            .collection("nutritionRecord")
            .doc(dateString + meal)
            // use "add" for collection, use set for document
            .set({
              Date: Number(dateString),
              Meal: "dinner",
              Name: combineName,
              Serve: combineServe
              //  }
            })

            .then(() => {
              dispatch({
                type: "SEND_DATA_TO_FIREBASE",
                stateName,
                stateServe
              });
            });
        } else {
          // doc.data() will be undefined in this case
          console.log("No previous document!");
          firestore
            .collection("member")
            .doc(userUid)
            .collection("nutritionRecord")
            .doc(dateString + meal)
            // use "add" for collection, use set for document
            .set({
              Date: Number(dateString),
              Meal: "dinner",
              Name: stateName,
              Serve: stateServe
              // }
            })

            .then(() => {
              dispatch({
                type: "SEND_DATA_TO_FIREBASE",
                stateName,
                stateServe
              });
            });
        }
      }
      //  ================================================================================================
    });
  };
};

export const makeSelectedDatesToProps = (startDate, endDate) => {
  return {
    type: "MAKE_SELECTED_DATES_TO_PROPS",
    startDate,
    endDate
  };
};

export const changePropsStartDate = startDatesValue => {
  console.log(startDatesValue);
  return {
    type: "CHANGE_PROPS_START_DATE",
    startDatesValue
  };
};

export const changePropsEndDate = endDatesValue => {
  return {
    type: "CHANGE_PROPS_END_DATE",
    endDatesValue
  };
};
