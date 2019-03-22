var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var cors = require("cors");
var mongoose = require("mongoose");
var cloudinary = require('cloudinary');
var fetch = require('node-fetch');

var config = require('./config');


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: "This is a secret",
  name: "cookie_name",
  // store: sessionStore, // connect-mongo session store
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

// setup all routes here
const routes = require('./routes');
app.use('/', routes);

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


// setup database
config.create("database-config.json", {
  username: "",
  password: "",
  url: "",
  useNewParser: true
}).then(function (created) {
  if (created) {
    console.log("Created default database config file. Edit it and restart the app.");
    process.exit();
    return;
  }

  config.load("database-config.json").then(function (loaded) {
    let dbUsername = loaded.username;
    let dbPassword = loaded.password;
    let databaseURL = loaded.url
      .replace("{username}", dbUsername)
      .replace("{password}", dbPassword);
    let useNewParser = loaded.useNewParser;

    mongoose.connect(databaseURL, {
      useNewUrlParser: useNewParser
    }).then(function () {
      mongoose.Promise = global.Promise;

      var db = mongoose.connection;

      //Bind connection to error event (to get notification of connection errors)
      db.on('error', console.error.bind(console, 'MongoDB connection error:'));

      console.log("Successfully connected to the database");

    }).catch(function (err) {
      console.log("There was an error connecting to the database.");
      console.log(err);
      process.exit();
      return;
    });
  }).catch(function (err) {
    console.log("There was an error creating the database config file.");
    console.log(err);
    return;
  });
});

// setup image CDN config
config.create("image-cdn-config.json", {
  cloud_name: "",
  api_key: "",
  api_secret: ""
}).then(function (created) {
  if (created) {
    console.log("Created default database config file. Edit it and restart the app.");
    process.exit();
    return;
  }

  config.load("image-cdn-config.json").then(function (loaded) {

    let url = "https://API_KEY:API_SECRET@api.cloudinary.com/v1_1/CLOUD_NAME/resources/image"
      .replace("API_KEY", loaded.api_key)
      .replace("API_SECRET", loaded.api_secret)
      .replace("CLOUD_NAME", loaded.cloud_name);

    fetch(url).then(function (value) {
      if (value.status == 200) {
        cloudinary.config(loaded);
        console.log("Successfully connected to the Image CDN");
      }
    }).catch(function (err) {
      console.log("There was an error connecting to the Image CDN.");
      console.log(err);
      process.exit();
    });
  }).catch(function (err) {
    console.log("There was an error creating the image config file.");
    console.log(err);
    process.exit();
    return;
  });
});



module.exports = app;