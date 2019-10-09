/* eslint-disable */

const functions = require("firebase-functions");
// const firestore = require("firestore");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
const credential = require("./credential");
const smtpTransport = require("nodemailer-smtp-transport");
// const gmailEmail = functions.config().gmail.email;
// const gmailPassword = functions.config().gmail.password;
admin.initializeApp(functions.config().firebase);

// import  firebase  from "../../../config/firebaseConfig";

exports.sendNutritionConfirmLetter = functions.firestore
  .document("member/{memberId}")
  .onUpdate((change, context) => {
    const contributer = change.after.data();
    console.log("填寫者", contributer);

    let contributerName = contributer.Name;
    let foodNameArray = contributer.foodContribute;
    let newFood = foodNameArray[foodNameArray.length - 1];
    
    const db = admin.firestore();
    let foodDetails = db.collection("nutrition").doc(newFood);

    foodDetails
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());

          let newnutritionName = newnutrition["食品名稱"];
    let newnutritionURL =
      "https://console.firebase.google.com/u/0/project/healthy-match/database/firestore/data~2Fnutrition~2F"
    +
    newnutritionName.toString();

    const mailOptions = {
      from: "HelloHealthyMatch@gmail.com",
      to: "HelloHealthyMatch@gmail.com",
      subject: "New Nutrition newnutritionName Is Added in Healthy Match Database!",
      html: `<p>${newnutritionName}</p>`
    };

    const mailTransport = nodemailer.createTransport({
      // service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: credential.user,
        pass: credential.pass
      }
    });

    try {
      await mailTransport.sendMail(mailOptions);
      return console.log("email has sent succesfully", newnutrition);
    } catch (error) {
      console.error("There was an error while sending the email:", error);
    }






        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });


      return null
  });

// exports.getContributer = functions.firestore
//   .document("member/{memberId}")
//   .onUpdate((change, context) => {
//     const contributer = change.after.data();

//     console.log("填寫者", contributer);

//     return contributer;
//   });

// exports.sendNutritionConfirmLetter = functions.firestore
//   .document("nutrition/{nutritionId}")
//   .onCreate(async (snap, context) => {
//     const newnutrition = snap.data();
//     console.log(newnutrition);

//     // let contributer = await exports.getContributer();
//     // console.log("轉過來", contributer);

//     let newnutritionName = newnutrition.食品名稱;
//     let newnutritionURL =
//       "https://console.firebase.google.com/u/0/project/healthy-match/database/firestore/data~2Fnutrition~2F";
//     // +
//     // newnutritionName.toString();

//     const mailOptions = {
//       from: "HelloHealthyMatch@gmail.com",
//       to: "HelloHealthyMatch@gmail.com",
//       subject: "New Nutrition Is Added in Healthy Match Database!",
//       html: `<p>123</p>`
//     };

//     const mailTransport = nodemailer.createTransport({
//       // service: "gmail",
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true,
//       auth: {
//         user: credential.user,
//         pass: credential.pass
//       }
//     });

//     try {
//       await mailTransport.sendMail(mailOptions);
//       return console.log("email has sent succesfully", newnutrition);
//     } catch (error) {
//       console.error("There was an error while sending the email:", error);
//     }
//     return null;
//   });

// auth: https://accounts.google.com/b/0/DisplayUnlockCaptcha

// let test2 = new Promise((resolve, reject) => {
//   exports.sendNutritionConfirmLetter = functions.firestore
//     .document("nutrition/{nutritionId}")
//     .onCreate(async (snap, context) => {
//       const newnutrition = snap.data();
//       console.log(newnutrition);
//       resolve(newnutrition);
//     });
//   return null;
// });

// exports.getContributer = functions.firestore
//   .document("member/{memberId}")
//   .onUpdate(async (change, context) => {
//     const contributer = change.after.data();

//     console.log("填寫者", contributer);
//     sendEmail();
//   });

// function sendEmail() {
//   console.log("a");
//   //let promiseOne = test1;
//   let promiseTwo = test2;
//   console.log("b", promiseTwo);
//   Promise.all([promiseTwo])
//     .then(test => {
//       console.log("test", test);
//       let newnutritionName = newnutrition.食品名稱;
//       let newnutritionURL =
//         "https://console.firebase.google.com/u/0/project/healthy-match/database/firestore/data~2Fnutrition~2F" +
//         encodeURIComponent(newnutritionName.toString());

//       const mailOptions = {
//         from: '"Healthy Match" <HelloHealthyMatch@gmail.com>',
//         to: "HelloHealthyMatch@gmail.com",
//         subject: "New Nutrition Is Added in Healthy Match Database!",
//         html: `<p style="font-size: 16px;">Thank You for ${newnutrition}</p>
//       <button><a href=${newnutritionURL}>查看明細</a></button> `
//       };
//       mailTransport.sendMail(mailOptions);
//     })
//     .catch(() => {
//       console.log("有錯");
//     });
// }
