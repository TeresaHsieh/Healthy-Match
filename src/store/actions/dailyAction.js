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

export const checkFirestoreNutritionRecord = (startDate, endDate) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // step 1: find foods' name and serve in specific time
    const firestore = getFirestore();
    let allRecord = firestore // "allRecord" is all the data that happens in the giving inerval of time
      .collection("member")
      .doc("3Smynu8UzW2gPvJrZYOZ")
      .collection("nutritionRecord")
      .where("Date", ">=", startDate)
      .where("Date", "<=", endDate);

    let getNameNutrition = new Promise((resolve, reject) => {
      let theName = "";
      let theDate = [];
      let foodNumber = [];
      let data = [];
      let sum;
      let test = [];
      let teresa = [];

      let test_2 = [];
      let test_3 = [];

      allRecord
        .get()
        .then(mealTypes => {
          mealTypes.docs.forEach(mealAndNameTypes => {
            theName = mealAndNameTypes.get("Name"); // all foodName of the giving time
            theDate = mealAndNameTypes.get("Date");
            // console.log(theName);
            // console.log(theDate);
            // console.log(mealAndNameTypes);

            foodNumber.push(theName.length); // knowing the number of foods in daily
            const add = (a, b) => a + b;
            sum = foodNumber.reduce(add);
            console.log("number", foodNumber.length);
            console.log("sum", sum);

            theName.forEach(name => {
              let meal = {
                name: name,
                date: theDate
              };
              test_2.push(meal);
            });
          });
        })
        .then(() => {
          console.log("test_2", test_2);
          let loaded = 0;
          for (let i = 0; i < test_2.length; i++) {
            firestore
              .collection("nutrition")
              .doc(test_2[i].name.foodName)
              .get()
              .then(function(ref) {
                if (ref.exists) {
                  //test_3.push({ data: ref.data() });
                  test_3.push({ date: test_2[i].date, data: ref.data() });
                }
              })
              .then(() => {
                console.log("testblablabla", test_2);
                console.log("TESTTTTTT");
                loaded++;
                if (loaded === test_2.length) {
                  console.log("test_3", test_3);
                  resolve(test_3);
                }
              });
          }
        });
    });

    let getServe = new Promise((resolve, reject) => {
      let serves = [];

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
    let foodNutrition;
    let check = [];

    let theDate;
    let data = {};

    Promise.all([getNameNutrition, getServe])
      .then(nutritionAndServes => {
        console.log(nutritionAndServes);
        foodNutrition = nutritionAndServes[0];
        console.log("foodNutrition", foodNutrition);
        let foodServes = nutritionAndServes[1];
        console.log("foodServes ", foodServes);

        for (let m = 0; m < foodNutrition.length; m++) {
          //for (let key in foodNutrition[m]) {
          // if data is an array, key will be the index number of element in it. if data is an object, key will be the key in it
          let yoyo = foodNutrition[m].data;

          let empty = [];
          console.log(yoyo);
          for (let key in yoyo) {
            if (yoyo[key] != null && !isNaN(yoyo[key])) {
              yoyo[key] = yoyo[key] * foodServes[m];
            }
          }
        }
        console.log(foodNutrition);
      })
      .then(() => {
        dispatch({ type: "CHECK_FIRESTORE_NUTRITION_RECORD", foodNutrition });
      });
    //==========================

    // console.log("gagaggagagaaaa", foodNutrition);

    // for (let f = 0; f < foodNutrition.length; f++) {
    //   let yeah = foodNutrition[f].data;
    //   console.log("yeah", yeah);
    //   for (let key in yeah) {
    //     console.log(yeah);
    //     console.log(yeah[key]);
    //     if (yeah[key] != null && !isNaN(yeah[key])) {
    //       console.log("123123123", results[0]);
    //       //if (results[theDate][key]) {

    //       //     results[theDate][key] += yeah[key];
    //       //   } else {
    //       //     results[theDate][key] = yeah[key];
    //       //}
    //       //   console.log(results);
    //     }
    //   }
    // }
    // console.log("hehe", results);
    // console.log("123");

    //============================

    // let promise = getServe();
    // promise.then(function(serves) {
    //   // console.log(serves);
    //   console.log("hope", serves);

    //   // console.log(sum);
    //   // first need to know what we want for result, define result as an object and finally will contain each nutrition by dates
    //   // let results = {};

    //   // let test = [];
    //   // let yoyo = [];
    //   // allRecord.get().then(mealTypes => {
    //   //   mealTypes.docs.forEach(mealAndNameTypes => {
    //   //     let theDate = mealAndNameTypes.get("Date");

    //   //     // if [theDate] isn't exist in result, define it as an object, and then ready to be put nutrition information inside

    //   //     theName = mealAndNameTypes.get("Name"); // all foodName of the giving time

    //   //     foodNumber.push(theName.length); // knowing the number of foods in daily
    //   //     const add = (a, b) => a + b;
    //   //     let sum = foodNumber.reduce(add);

    //   //     let final = [];

    //   //     theName.forEach(name => {
    //   //       firestore
    //   //         .collection("nutrition")
    //   //         .doc(name.foodName)
    //   //         .get()
    //   //         .then(function(ref) {
    //   //           if (ref.exists) {
    //   //             let data = ref.data();

    //   //             for (let key in data) {
    //   //               // if data is an array, key will be the index number of element in it. if data is an object, key will be the key in it
    //   //               if (data[key] != null && !isNaN(data[key])) {
    //   //                 console.log(test[t].data[key] * serves[t]);

    //   //                 // for (let t = 0; t < sum; t++) {
    //   //                 //   // final.push(test[t].data[key] * serves[t]);

    //   //                 // }

    //   //                 // for (let t = 0; t <= sum - 1; t++) {
    //   //                 //   if (results[theDate][key]) {
    //   //                 //     results[theDate][key] += data[key] * serves[t];
    //   //                 //   } else {
    //   //                 //     results[theDate][key] = data[key] * serves[t];
    //   //                 //   }
    //   //                 // }
    //   //               }
    //   //             }
    //   //             //====
    //   //             console.log("hope", yoyo);
    //   //             // console.log("hope", final);

    //   //             //====
    //   //           }
    //   //         });
    //   //     });
    //   //   });
    //   // });
    //   // console.log("this is", results);

    //   //
    // });
  };
};

// backup =================================================
// export const checkFirestoreRecordProtein = (startDate, endDate) => {
//   return (dispatch, getState, { getFirebase, getFirestore }) => {
//     // step 1: find foods' name and serve in specific time
//     const firestore = getFirestore();
//     let allRecord = firestore // "allRecord" is all the data that happens in the giving inerval of time
//       .collection("member")
//       .doc("3Smynu8UzW2gPvJrZYOZ")
//       .collection("nutritionRecord")
//       .where("Date", ">=", startDate)
//       .where("Date", "<=", endDate);

//     function getNameNutrition() {
//       return new Promise(function(resolve, reject) {
//         // first need to know what we want for result, define result as an object and finally will contain each nutrition by dates
//         let results = {};

//         // let theMeal = mealAndNameTypes.id.replace(theDate, "");
//         let theName = "";
//         let theServe = "";
//         let foodNumber = [];

//         let serves = [];

//         allRecord.get().then(mealTypes => {
//           mealTypes.docs.forEach(mealAndNameTypes => {
//             let theDate = mealAndNameTypes.get("Date");

//             // if [theDate] isn't exist in result, define it as an object, and then ready to be put nutrition information inside
//             if (!results[theDate]) {
//               results[theDate] = {};
//             }

//             theName = mealAndNameTypes.get("Name"); // all foodName of the giving time
//             theServe = mealAndNameTypes.get("Serve");

//             foodNumber.push(theName.length); // knowing the number of foods in daily
//             const add = (a, b) => a + b;
//             const sum = foodNumber.reduce(add);

//             // all food user had record (preparing to transer foodName into nutrition)
//             // for (let n = 0; n <= sum; n++) {
//             //   serves.push(theServe[n].foodServe);
//             // }

//             theName.forEach(name => {
//               firestore
//                 .collection("nutrition")
//                 .doc(name.foodName)
//                 .get()
//                 .then(function(ref) {
//                   if (ref.exists) {
//                     let data = ref.data();
//                     console.log("yeah", data);

//                     //=====

//                     //====
//                     for (let key in data) {
//                       // if data is an array, key will be the index number of element in it. if data is an object, key will be the key in it
//                       if (data[key] != null && !isNaN(data[key])) {
//                         if (results[theDate][key]) {
//                           results[theDate][key] += data[key];
//                         } else {
//                           results[theDate][key] = data[key];
//                         }
//                       }
//                     }
//                   }
//                 });
//               console.log("this is", results);
//             });

//             // ================================================================================ important

//             // // all food user had record (preparing to transer foodName into nutrition)
//             // theName.forEach(name => {
//             //   firestore
//             //     .collection("nutrition")
//             //     .doc(name.foodName)
//             //     .get()
//             //     .then(function(ref) {
//             //       if (ref.exists) {
//             //         let data = ref.data();
//             //         console.log("yeah", data);

//             //         //=====

//             //         //====
//             //         for (let key in data) {
//             //           // if data is an array, key will be the index number of element in it. if data is an object, key will be the key in it
//             //           if (data[key] != null && !isNaN(data[key])) {
//             //             if (results[theDate][key]) {
//             //               results[theDate][key] += data[key];
//             //             } else {
//             //               results[theDate][key] = data[key];
//             //             }
//             //           }
//             //         }
//             //       }
//             //     });
//             //   console.log("this is", results);
//             // });

//             // ================================================================================ important

//             // for (let number in theServe) {
//             //   console.log(theServe[number]);
//             // }

//           });
//         });
//       });
//     }
//     let promise = getNameNutrition();
//     promise.then(function(nameArrayInSpecificDay) {
//       console.log("get the data", nameArrayInSpecificDay);
//     });
//   };
// };
// backup =================================================

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
      .doc("3Smynu8UzW2gPvJrZYOZ")
      .collection("nutritionRecord")
      .doc("20190910" + meal);

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
        console.log("hey", combineName);
        firestore
          .collection("member")
          .doc("3Smynu8UzW2gPvJrZYOZ")
          .collection("nutritionRecord")
          .doc(dateString + meal)
          // use "add" for collection, use set for document
          .set({
            Date: Number(dateString),
            // [mealString]: {
            Name: combineName,
            Serve: combineServe
            //  }
          })
          // .set({
          //   Name: combineName,
          //   Serve: combineServe
          // })
          .then(() => {
            dispatch({ type: "SEND_DATA_TO_FIREBASE", stateName, stateServe });
          });
      } else {
        // doc.data() will be undefined in this case
        console.log("No previous document!");
        firestore
          .collection("member")
          .doc("3Smynu8UzW2gPvJrZYOZ")
          .collection("nutritionRecord")
          .doc(dateString + meal)
          // use "add" for collection, use set for document
          .set({
            Date: Number(dateString),
            //[mealString]: {
            Name: stateName,
            Serve: stateServe
            // }
          })

          .then(() => {
            dispatch({ type: "SEND_DATA_TO_FIREBASE", stateName, stateServe });
          });
      }
    });
  };
};
