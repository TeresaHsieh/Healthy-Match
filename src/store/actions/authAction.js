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

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(info => {
        return firestore
          .collection("member")
          .doc(info.user.uid)
          .set({
            Name: newUser.name,
            MatchType: newUser.matchGender
          });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const checkUserInfo = userUID => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const firebase = getFirebase();
    const storageRef = firebase.storage().ref();
    let UserInfo;
    let matchImg;
    let matchImgDownloadURL;
    let UserAllInfo = firestore
      .collection("member")
      .doc(userUID.toString())
      .get()
      .then(function(doc) {
        if (doc.exists) {
          UserInfo = doc.data();
          matchImg = UserInfo.MatchType;

          if (matchImg == "boyMatch") {
            storageRef
              .child("characters/boymatch.png")
              .getDownloadURL()
              .then(function(url) {
                let xhr = new XMLHttpRequest();
                xhr.responseType = "blob";
                xhr.onload = function(event) {
                  let blob = xhr.response;
                };
                xhr.open(
                  "GET",
                  "https://firebasestorage.googleapis.com/v0/b/healthy-match.appspot.com/o/characters%2Fboymatch.png?alt=media&token=7af3adf2-b390-4f70-afce-e04698767083"
                );
                xhr.send();
                matchImgDownloadURL = url;
              })
              .catch(function(error) {
                // Handle any errors
              });
            console.log("URL", matchImgDownloadURL);
          } else if (matchImg == "girlMatch") {
            storageRef
              .child("characters/girlmatch.png")
              .getDownloadURL()
              .then(function(url) {
                let xhr = new XMLHttpRequest();
                xhr.responseType = "blob";
                xhr.onload = function(event) {
                  let blob = xhr.response;
                };
                xhr.open(
                  "GET",
                  "https://firebasestorage.googleapis.com/v0/b/healthy-match.appspot.com/o/characters%2Fgirlmatch.png?alt=media&token=f8d02dfa-85e5-4e33-b5c7-88d9ff6c464e"
                );
                xhr.send();
                matchImgDownloadURL = url;
              })
              .catch(function(error) {
                // Handle any errors
              });
            console.log("URL", matchImgDownloadURL);
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });

    return {
      type: "CHECK_USER_INFO",
      UserInfo,
      matchImgDownloadURL
    };
  };
};

export const updateInfoToFirestore = (userUID, infoName, infoData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("member")
      .doc(userUID)
      .update({
        [infoName]: infoData
      });
  };
};
