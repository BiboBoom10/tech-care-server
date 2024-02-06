const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const mainRoute = require("./routes/main");
const HttpError = require("./models/http-error");

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

mongoose.set("strictQuery", false).connect(process.env.MONGO_URL).then(() => {
    app.listen(process.env.PORT || 8000);
    console.log("Database connected successfully.");
  }).catch((err) => {
    console.log(err);
  });