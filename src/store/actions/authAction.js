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
                "https://firebasestorage.googleapis.com/v0/b/healthy-match.appspot.com/o/characters%2Fgirlmatch.png?alt=media&token=f8d02dfa-85e5-4e33-b5c7-88d9ff6c464e"
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
                "https://firebasestorage.googleapis.com/v0/b/healthy-match.appspot.com/o/characters%2Fboymatch.png?alt=media&token=7af3adf2-b390-4f70-afce-e04698767083"
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
