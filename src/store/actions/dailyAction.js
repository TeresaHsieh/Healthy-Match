export const searchKeywords = keyword => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    let keywords = [];
    if (keyword.trim() !== "") {
      let theRecord = firestore
        .collection("nutrition")
        .where("搜尋關鍵字", "array-contains", keyword)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            keywords.push(doc.id);
          });
          dispatch({ type: "SEARCH_KEYWORDS", keywords });
        })
        .catch(function(error) {
          // console.log("Error getting documents: ", error);
        });
    }
  };
};

export const clearValues = emptyValue => {
  return dispatch => {
    dispatch({ type: "CLEAR_VALUES", emptyValue });
  };
};

export const checkFirestoreNutritionRecord = (startDate, endDate, userUID) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // step 1: find all the data(foodname and serving) that record in the giving inerval of time
    let userUid = userUID.toString();

    const firestore = getFirestore();
    let allRecord = firestore
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

      let test_3 = [];
      allRecord
        .get()
        .then(mealTypes => {
          mealTypes.docs.forEach(mealAndNameTypes => {
            theName = mealAndNameTypes.get("Name"); // all foodName of the giving time
            theDate = mealAndNameTypes.get("Date");

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
          let yoyo = foodNutrition[m].data;

          for (let key in yoyo) {
            if (yoyo[key] != null && !isNaN(yoyo[key])) {
              yoyo[key] = yoyo[key] * foodServes[m];
            }
          }
        }
      })
      .then(() => {
        let foodNutritionData;
        let foodNutritionDate;

        for (let f = 0; f < foodNutrition.length; f++) {
          foodNutritionData = foodNutrition[f].data;
          foodNutritionDate = foodNutrition[f].date;

          for (let key in foodNutritionData) {
            if (
              foodNutritionData[key] != null &&
              !isNaN(foodNutritionData[key]) &&
              foodNutritionData[key] != undefined
            ) {
              if (!results[foodNutritionDate]) {
                results[foodNutritionDate] = {};
              }
              if (results[foodNutritionDate][key]) {
                results[foodNutritionDate][key] += foodNutritionData[key];
              } else {
                results[foodNutritionDate][key] = foodNutritionData[key];
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
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1; // if no plus one, the result would be August when expected September
    let day = today.getDate();

    let yearString = year.toString();

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

    const firestore = getFirestore();

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

export const sentDataToNutritionDatbase = newNutrition => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    delete newNutrition.openContributionSuccessfulBox;
    firestore
      .collection("nutrition")
      .doc(newNutrition.食品名稱)
      .set(newNutrition, { merge: true });

    let NewNutritionName = newNutrition.食品名稱;
    let keyWords;
    let keyWordsArray = [];
    keyWordsArray = NewNutritionName.split("");

    firestore
      .collection("nutrition")
      .doc(newNutrition.食品名稱)
      .set({ 搜尋關鍵字: keyWordsArray }, { merge: true });
  };
};

export const deleteRecord = objectIndex => {
  return {
    type: "DELETE_RECORD",
    objectIndex
  };
};

export const usingFilterTimeFunction = () => {
  return {
    type: "USING_FILTER_TIME_FUNCTION"
  };
};

export const removeUsingFilterFunction = () => {
  return {
    type: "REMOVE_USING_FILTER_TIME_FUNCTION"
  };
};

export const personalNutritionContribution = (useruid, newNutrition) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    let memberFile = firestore.collection("member").doc(useruid);

    if (memberFile) {
      memberFile.get().then(function(doc) {
        if (doc.data().foodContribute) {
          let foodItems = doc.data().foodContribute;
          foodItems.push(newNutrition.食品名稱);
          memberFile.set({ foodContribute: foodItems }, { merge: true });
        } else {
          let foodItems = [];
          foodItems.push(newNutrition.食品名稱);
          memberFile.set({ foodContribute: foodItems }, { merge: true });
        }
      });
    }
  };
};
