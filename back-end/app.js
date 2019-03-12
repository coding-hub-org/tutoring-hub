var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var cors = require("cors");

var app = express();

// setup all routes here
const routes = require('./routes');
app.use('/', routes);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: "It's a new secret!"
}));

// DB Helper
var dbhelper = require('./dbhelper');
dbhelper.createConfig().then(function (created) {
  if (created) {
    console.log("Created default database config file. Edit it and restart the app.");
  }
  // connect
  dbhelper.connect().then(function () {
    console.log("Successfully connected to the database");
  }).catch(function (err) {
    console.log("There was an error connecting to the database.");
    console.log(err);
  });
}).catch(function (err) {
  console.log("There was an error creating the database config file.");
  console.log(err);
});

// Image API
var imageHelper = require('./imagehelper');
imageHelper.createConfig().then(function (created) {
  if (created) {
    console.log("Created default image helper config file. Edit it and restart the app.");
  }
  // connect
  // imageHelper.connect().then(function () {
  //   console.log("Successfully connected to the image");
  // }).catch(function (err) {
  //   console.log("There was an error connecting to the image.");
  //   console.log(err);
  // });
}).catch(function (err) {
  console.log("There was an error creating the image helper config file.");
  console.log(err);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;