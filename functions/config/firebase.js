const functions = require('firebase-functions'); //59K (gzipped: 17.9K)
const admin = require('firebase-admin');  //firebase-admin for server side

//initialize firebase-admin (SERVER SIDE)
//for local emulators only: set GOOGLE_APPLICATION_CREDENTIALS=/config/portfolio-c0519-firebase-adminsdk-k6ms5-676c54218a.json
admin.initializeApp(functions.config().firebase);  

//connect to database
const db = admin.database();

//connect to authentication
const auth = admin.auth();

//connect to storage
const store = admin.storage();

const bucketName = "portfolio-c0519.appspot.com"

module.exports = { admin, db, auth, store, bucketName }
