/* eslint-disable */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const credential = require("./credential");
const smtpTransport = require("nodemailer-smtp-transport");
const serviceAccount = require("./firebaseAdminSDK.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://healthy-match.firebaseio.com",
  authDomain: "healthy-match.firebaseapp.com",
  projectId: "healthy-match",
  storageBucket: "healthy-match.appspot.com",
  messagingSenderId: "560759415450",
  appId: "1:560759415450:web:9fc855be631767dc"
});

exports.sendNutritionConfirmLetter = functions.firestore
  .document("member/{memberId}")
  .onUpdate((change, context) => {
    const contributer = change.after.data();

    let contributerName = contributer.Name;
    let foodNameArray = contributer.foodContribute;
    let newFood = foodNameArray[foodNameArray.length - 1];

    const db = admin.firestore();
    let foodDetails = db.collection("nutrition").doc(newFood);

    foodDetails
      .get()
      .then(function(doc) {
        if (doc.exists) {
          let newnutritionName = doc.data()["食品名稱"];
          let newnutritionURL =
            "https://console.firebase.google.com/u/0/project/healthy-match/database/firestore/data~2Fnutrition~2F" +
            encodeURIComponent(newnutritionName.toString());

          const mailOptions = {
            from: "HelloHealthyMatch@gmail.com",
            to: "HelloHealthyMatch@gmail.com",
            subject:
              "New Nutrition: " +
              newnutritionName +
              " Is Added in Healthy Match Database!",
            html: `
            <p>填寫者：${contributerName}</p>
            <p>食品名稱：${newnutritionName}</p>
            <p>總熱量：${doc.data()["修正熱量(kcal)"]}</p>
            <p>碳水化合物：${doc.data()["總碳水化合物(g)"]}</p>
            <p>蛋白質：${doc.data()["粗蛋白(g)"]}</p>
            <p>脂肪：${doc.data()["粗脂肪(g)"]}</p>
            <button style="border: none;"><a href="${newnutritionURL}">查看營養細節</a></button>`
          };

          const mailTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: credential.user,
              pass: credential.pass
            }
          });

          try {
            mailTransport.sendMail(mailOptions);
            return console.log("email has sent succesfully", doc);
          } catch (error) {
            console.error("There was an error while sending the email:", error);
          }
        } else {
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });

    return null;
  });
