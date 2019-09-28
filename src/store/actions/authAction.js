export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    if (newUser.matchGender == "girlMatch") {
      firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(info => {
          return firestore
            .collection("member")
            .doc(info.user.uid)
            .set({
              Name: newUser.name,
              MatchType: newUser.matchGender,
              MatchCharacterIMG:
                "https://firebasestorage.googleapis.com/v0/b/healthy-match.appspot.com/o/characters%2Fgirlmatch.png?alt=media&token=f8d02dfa-85e5-4e33-b5c7-88d9ff6c464e",
              MatchCharacterIMGAlcohol:
                "https://firebasestorage.googleapis.com/v0/b/healthy-match.appspot.com/o/characters%2Fstatus%2Fgirlmatch-alcohol.png?alt=media&token=4d5fd140-1b19-408b-8cb0-b5067d8cb7c5",
              MatchCharacterIMGCarbohydrate:
                "https://firebasestorage.googleapis.com/v0/b/healthy-match.appspot.com/o/characters%2Fstatus%2Fgirlmatch-carbohydrate.png?alt=media&token=fbbb881b-c3da-4410-b305-df0cd09aeefc",
              MatchCharacterIMGFat:
                "https://firebasestorage.googleapis.com/v0/b/healthy-match.appspot.com/o/characters%2Fstatus%2Fgirlmatch-fat.png?alt=media&token=73407bef-30c7-494b-9200-147571240527",
              MatchCharacterIMGProtein:
                "https://firebasestorage.googleapis.com/v0/b/healthy-match.appspot.com/o/characters%2Fstatus%2Fgirlmatch-protein.png?alt=media&token=a68a7357-25a4-43e0-aa33-666121adbe09",
              MatchCharacterIMGVitamin:
                "https://firebasestorage.googleapis.com/v0/b/healthy-match.appspot.com/o/characters%2Fstatus%2Fgirlmatch-vitamin.png?alt=media&token=576bb160-0bf1-44db-9f8a-54b9744429cf"
            });
        })
        .then(() => {
          dispatch({ type: "SIGNUP_SUCCESS" });
        })
        .catch(err => {
          dispatch({ type: "SIGNUP_ERROR", err });
        });
    } else if (newUser.matchGender == "boyMatch") {
      firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(info => {
          return firestore
            .collection("member")
            .doc(info.user.uid)
            .set({
              Name: newUser.name,
              MatchType: newUser.matchGender,
              MatchCharacterIMG:
                "https://firebasestorage.googleapis.com/v0/b/healthy-match.appspot.com/o/characters%2Fboymatch.png?alt=media&token=7af3adf2-b390-4f70-afce-e04698767083",
              MatchCharacterIMGAlcohol:
                "https://firebasestorage.googleapis.com/v0/b/healthy-match.appspot.com/o/characters%2Fstatus%2Fboymatch-alcohol.png?alt=media&token=d8fc09c7-d458-4052-b7f0-1272e6386901",
              MatchCharacterIMGCarbohydrate:
                "https://firebasestorage.googleapis.com/v0/b/healthy-match.appspot.com/o/characters%2Fstatus%2Fboymatch-carbohydrate.png?alt=media&token=db051e0a-ad02-48a6-963f-911f71bea87e",
              MatchCharacterIMGFat:
                "https://firebasestorage.googleapis.com/v0/b/healthy-match.appspot.com/o/characters%2Fstatus%2Fboymatch-fat.png?alt=media&token=eeddf17e-fbaa-4a5f-88a0-3962845cd523",
              MatchCharacterIMGProtein:
                "https://firebasestorage.googleapis.com/v0/b/healthy-match.appspot.com/o/characters%2Fstatus%2Fboymatch-protein.png?alt=media&token=221f9fc9-dce0-4eae-ad02-af1a863b907e",
              MatchCharacterIMGVitamin:
                "https://firebasestorage.googleapis.com/v0/b/healthy-match.appspot.com/o/characters%2Fstatus%2Fboymatch-vitamin.png?alt=media&token=e0f42d41-1097-4bbb-9feb-db1157e784ab"
            });
        })
        .then(() => {
          dispatch({ type: "SIGNUP_SUCCESS" });
        })
        .catch(err => {
          dispatch({ type: "SIGNUP_ERROR", err });
        });
    }
  };
};

export const checkUserInfo = userUID => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const firebase = getFirebase();
    let UserInfo;
    let UserAllInfo = firestore
      .collection("member")
      .doc(userUID.toString())
      .get()
      .then(function(doc) {
        if (doc.exists) {
          UserInfo = doc.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .then(() => {
        dispatch({ type: "CHECK_USER_INFO", UserInfo });
      });
    // return {
    //   type: "CHECK_USER_INFO",
    //   UserInfo,
    //   matchImgDownloadURL
    // };
  };
};

// export const updateInfoToFirestore = (userUID, infoName, infoData) => {
//   return (dispatch, getState, { getFirebase, getFirestore }) => {
//     const firestore = getFirestore();

//     firestore
//       .collection("member")
//       .doc(userUID)
//       .update({
//         [infoName]: infoData
//       });
//   };
// };

export const updateInfoToFirestore = (userUID, wholeState) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("member")
      .doc(userUID)
      .update(wholeState);
  };
};

export const sentLastImgToReduxStore = LastIMG => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: "SENT_LAST_IMG_TO_REDUX_STORE", LastIMG });

    return {
      type: "SENT_LAST_IMG_TO_REDUX_STORE",
      LastIMG
    };
  };
};

export const sentDescriptionToReduxStore = stateDescription => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: "SENT_DESCRIPTION_TO_REDUX_STORE", stateDescription });

    return {
      type: "SENT_DESCRIPTION_TO_REDUX_STORE",
      stateDescription
    };
  };
};
