# Healthy Match

A website that uses gamification to create a fun environment for incentivizing users to track daily nutrition and have balanced diet.

Get started: https://healthy-match.firebaseapp.com

## Technologies

- React
- React Router
- Redux
- Chart.js
- Nodemailer
- Firebase
  - Firestore
  - Storage
  - Cloud Function
  - Authentication
  - Hosting
- CSS Animation
- RWD
- Webpack
- Babel
- Unit test: Jest

## Key Features

1. Help You Keep A Record Of Everything You EAT Per Day!

   With Healthy Match, you can record everything you eat in daily breakfast, lunch or dinner, including foods' name, serving, meal time, and date which will all be stored properly in database.

   ![](https://i.imgur.com/64r047Q.png =600x)

2. Search Over 2 Thousand Accurate Food Facts In Database Which Were Imported From FDA.

   You can find 2,000+ nutrition facts and information in Healthy Match ,which were imported from FDA.

   ![](https://i.imgur.com/H1drDi1.gif =600x)

3. "Auto-Complete Food Search" Makes Recording More Easier!

   Using Firestore can still build Auto-Complete Food Search function for users! After breaking the string of foods' name into different pieces and storing as data in Firestore document field, foods' name can be found with auto-complete results, then users can record their daily diet with ease.

   ![](https://i.imgur.com/6GCUUYU.gif =600x)

4. Nutritional Statistics With Restructured Data And Chart.js, The Changes Of Foods You Eat And Its Nutrition Is Clear.

   After retrieving data from Firestore, Healthy Match help organizing data well, you can see the records of last 7 days right after entering the page. Also, restructuring data for showing foods of breakfast, lunch and dinner seperately on charts' labels.

   ![](https://i.imgur.com/KyFTU7l.png =600x)

   ![](https://i.imgur.com/QxqwNvR.png =600x)

5. Use Calendar For Select The Time Interval, Which Makes Look Up Through The Records More Easier.

   Want to see previous record before last 7 days? No problem! Just click on the calendar and select the time interval, you can get previous diet records right away!

   ![](https://i.imgur.com/MnmW0Nw.png =600x)

   ![](https://i.imgur.com/lvxbOjv.png =600x)

   ![](https://i.imgur.com/mxLikWf.gif =600x)

6. Get Emails When Members Help Adding Food Facts Into Database.

   Didn't find what you eat in search results? You can add your frequent eaten food and its nutrition facts into database by yourself! After adding, you can immediately find the food in search result!

   Also, in order to prevent from improper food adding, everytime users add food facts into database, developer would get an email with information of user and new nutrition.

   ![](https://i.imgur.com/fHKKiP0.png =600x)
   ![](https://i.imgur.com/WR2Qk8v.png =600x)

7. The Match Will Change Status According To Your Eating Habits!

   You are what you eat, and your "Match" are what you eat too! If you consume too much protein, your Match will become musclar, if you drink too much alcohol, Match will become so drunk!

   ![](https://i.imgur.com/TulYX0u.png =600x)

   ![](https://i.imgur.com/ov5qvqJ.png =600x)

8. Always Care About Your Health With Reminder.!

   After recording your meals, Healthy Match will give you some feedback about your weekly diet, keep you always have balanced meal plan!

9. 404 page

   Accidentally type the URL wrong? Healthy Match will give you a hint with 404 page ❤

   ![](https://i.imgur.com/5eVky14.png =600x)
