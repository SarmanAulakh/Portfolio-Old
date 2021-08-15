const express = require('express');
const functions = require('firebase-functions');
const nodemailer = require("nodemailer");
const { db, store, bucketName } = require("../config/firebase")

const bucket = store.bucket(bucketName)
const router = express.Router();

// Pipe data stream to res as destination
router.get("/resume", (req, res) => {
  res.contentType("routerlication/pdf");
  bucket
    .file("Developer Final Resume 2021.pdf")
    .createReadStream()
    .on('error', (error) => {
      res.status(500).json({ error })
    })
    .pipe(res);
});

// Get everything in DB
router.get('/', (req, res) => {
  db.ref().get()
    .then(snapshot => {
      let data = snapshot.val()
      data.experience.reverse()

      // get set of unique categories
      let categories = new Set()  
      data.projects.forEach((proj, i) => {
        categories.add(proj.category)
        proj.id = i                     //add unique id
      })
      data.categories = Array.from(categories)
      res.send(data)
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
});

// Get certificate photos
router.get('/certificates', async (req, res) => {
  bucket.getFiles({ autoPaginate: false, prefix: 'certificates' })
    .then((data) => {
      const files = data[0]
      files.shift()
      let res_arr = []
      files.map(file => {
        const fileName = file.name.slice(
          file.name.lastIndexOf('/') + 1
        );
        res_arr.push({
          url: `https://firebasestorage.googleapis.com/v0/b/portfolio-c0519.appspot.com/o/${file.id}?alt=media&token=${file.metadata.metadata.firebaseStorageDownloadTokens}`,
          name: fileName
        })
      })
      res.send(res_arr)
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
});

router.get('/certificate', async (req, res) => {
  const file = req.body()

  file
    .createReadStream()
    .pipe(res)
    .catch((error) => {
      res.status(500).json({ error })
    })
});

router.post("/contact", (req, res) => {
  sendEmail({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
  res.send({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });
});

function sendEmail(contactInfo) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: functions.config().env.email,
      pass: functions.config().env.pass,
    },
  });

  //SEND EMAIL TO MYSELF
  transporter.sendMail({
    from: "tenkosupreme@gmail.com",
    to: "tenkosupreme@gmail.com",
    subject: `www.sarmanaulakh.com: Email from ${contactInfo.name}, ${contactInfo.email}`,
    text: contactInfo.message,
  }, (err, info) => {
    if (err)
      console.log("error:", err);
    else
      console.log("Email sent: " + info.response);
  });

  //SEND CONFIRMATION TO USER
  transporter.sendMail({
    from: "tenkosupreme@gmail.com",
    to: contactInfo.email,
    subject: `www.sarmanaulakh.com Automated Message`,
    text: 'Message sent from www.sarmanaulakh.com was successfully recieved. I will try and get back to you as soon as possible. Thanks!',
  }, (err, info) => {
    if (err) console.log("error:", err);
    else console.log("Email sent: " + info.response);
  });
}



module.exports = router