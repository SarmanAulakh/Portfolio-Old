const functions = require('firebase-functions'); //59K (gzipped: 17.9K)
const admin = require('firebase-admin');  //firebase-admin for server side

//initialize firebase-admin (SERVER SIDE)
//for local emulators only: set GOOGLE_APPLICATION_CREDENTIALS=/config/portfolio-c0519-firebase-adminsdk-k6ms5-676c54218a.json
admin.initializeApp(functions.config().firebase);  
// var serviceAccount = require("./portfolio-c0519-firebase-adminsdk-k6ms5-676c54218a.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://portfolio-c0519-default-rtdb.firebaseio.com"
// });

//connect to database
const db = admin.database();

//connect to authentication
const auth = admin.auth();

//connect to storage
const store = admin.storage();

// Firebase App (the core Firebase SDK) is always required and must be listed before other Firebase SDKs
// const firebase = require("firebase"); 



// const firebaseConfig = {
//   apiKey: "AIzaSyDsj-ZSOOifUJNaBQ_iOqUaXuSj_bywv3M",
//   authDomain: "portfolio-c0519.firebaseapp.com",
//   databaseURL: "https://portfolio-c0519-default-rtdb.firebaseio.com",
//   projectId: "portfolio-c0519",
//   storageBucket: "portfolio-c0519.appspot.com",
//   messagingSenderId: "107745953075",
//   appId: "1:107745953075:web:5a050ae1fbf985bde86a46",
//   measurementId: "G-BJH9XPCPVK"
// };

// firebase.initializeApp(firebaseConfig)

const bucketName = "portfolio-c0519.appspot.com"




module.exports = { admin, db, auth, store, bucketName }