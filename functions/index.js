const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
const credential = require("./credential");
// import credential from "./credential";
// const gmailEmail = functions.config().gmail.email;
// const gmailPassword = functions.config().gmail.password;
admin.initializeApp(functions.config().firebase);

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: credential.user,
    pass: credential.pass
  }
});

exports.sendNutritionConfirmLetter = functions.firestore
  .document("nutrition/{nutritionId}")
  .onCreate(async (snap, context) => {
    const newnutrition = snap.data();
    console.log(newnutrition);
    console.log(credential.user);
    console.log(credential.pass);
    console.log(context);
    const mailOptions = {
      from: '"Healthy Match" <HelloHealthyMatch@gmail.com>',
      to: "justforphotos0506@gmail.com",
      subject: "Thank you for adding new nutrition!", // email subject
      html: `<p style="font-size: 16px;">Thank You for ${newnutrition}</p>`
    };

    try {
      await mailTransport.sendMail(mailOptions);
      return console.log("email has sent succesfully", newnutrition);
    } catch (error) {
      console.error("There was an error while sending the email:", error);
    }
    return null;
  });
