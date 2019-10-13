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

1. Help You Record The Foods You Eat of Three Meals Per Day!

   With Healthy Match, you can record everything you eat in daily breakfast, lunch or dinner, including food's name, serving, meal time, and date which will be stored properly in database.

   ![](https://i.imgur.com/64r047Q.png)

2) Search Over 2 Thousand Accurate Food Facts In Database Imported From FDA.

   You can find 2,000+ nutrition facts' data in Healthy Match ,which were imported from FDA and re-structure format for Healthy Match's users.

   ![](https://i.imgur.com/H1drDi1.gif)

3. Auto-Complete Food Search Makes Recording More Easier!

   Using Firestore can still develop Auto-Complete Food Search function for users! After breaking the foods' name into different pieces of string and stored as data in Firestore field, foods' name can be found with auto-complete results, users can record daily diet with ease.

   ![](https://i.imgur.com/6GCUUYU.gif)

4. Visualized Statistical Data With Re-Structured Data and Chart.js, Every Foods and Its Nutrition Is Clear.

   After retrieving data from Firestore, Healthy Match help organizing data well of last 7 days. Also re-structuring data for showing foods of breakfast, lunch and dinner seperately on chart label.

   ![](https://i.imgur.com/KyFTU7l.png)

   ![](https://i.imgur.com/QxqwNvR.png)

5) Use Calendar to Select Time Interval Makes Look Up History More Easier.

   Want to see previous record more the 7 days? No problem! Just click on the calendar and give a specific time interval, you can get previous diet records!

   ![](https://i.imgur.com/MnmW0Nw.png)

   ![](https://i.imgur.com/lvxbOjv.png)

   ![](https://i.imgur.com/mxLikWf.gif)

6.  Get Emails When Member Help Adding Food Facts to Database.

    Didn't find what you eat in search results? You can add your frequent eating food and its nutrition facts into database by yourself! After adding, you can immediately find the food in search result!

    Also, preventing from improper increasing, everytime users add food into database, developer would get an email of new nutrition details.

    ![](https://i.imgur.com/fHKKiP0.png)
    ![](https://i.imgur.com/WR2Qk8v.png)

7.  The Role Will Change Status

    You are what you eat, and your "match" are what you eat too! If you eat lots of protein, you match will become musclar, if you drink too much alchohol, match will become so drunk!

    ![](https://i.imgur.com/TulYX0u.png)

    ![](https://i.imgur.com/ov5qvqJ.png)

8.  Always Care About Your Health!

    After recording your meals, Healthy Match will give you some advice of that weekly diet, keep you always have balanced meal plan!

9.  404 page

    Accidentally type the URL wrong? Healthy Match will give you a hint with 404 page❤

    ![](https://i.imgur.com/5eVky14.png)
