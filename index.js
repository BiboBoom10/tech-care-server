const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const mainRoute = require("./routes/main");
const HttpError = require("./models/http-error");

const { sendEmail } = require('./util/email');

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(cors())

app.use(mainRoute);

app.use((req, res, next) => {
  throw new HttpError("The page you are looking for could not be found", null, 404);
});

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error has occured", content: error.content || null, });
});

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await sendEmail(name, email, message, 'bibokim6@gmail.com');
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Internal Server Error');
  }
});

mongoose.set("strictQuery", false).connect(process.env.MONGO_URL).then(() => {
    app.listen(process.env.PORT || 8000);
    console.log("Database connected successfully.");
  }).catch((err) => {
    console.log(err);
  });