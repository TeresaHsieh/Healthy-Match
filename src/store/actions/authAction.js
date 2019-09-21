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
                // `url` is the download URL for 'images/stars.jpg'

                // This can be downloaded directly:
                let xhr = new XMLHttpRequest();
                xhr.responseType = "blob";
                xhr.onload = function(event) {
                  let blob = xhr.response;
                };
                xhr.open("GET", url);
                xhr.send();
                matchImgDownloadURL = url;
              })
              .catch(function(error) {
                // Handle any errors
              });
          } else if (matchImg == "girlMatch") {
            storageRef
              .child("characters/girlmatch.png")
              .getDownloadURL()
              .then(function(url) {
                // `url` is the download URL for 'images/stars.jpg'

                // This can be downloaded directly:
                let xhr = new XMLHttpRequest();
                xhr.responseType = "blob";
                xhr.onload = function(event) {
                  let blob = xhr.response;
                };
                xhr.open("GET", url);
                xhr.send();
                matchImgDownloadURL = url;
              })
              .catch(function(error) {
                // Handle any errors
              });
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });

    return {
      type: "CHECKUSERINFO",
      UserInfo,
      matchImgDownloadURL
    };
  };
};
