import path from 'path';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cloudinary from 'cloudinary';

import indexRoute from "./routes/index";

import { createConfig, loadConfig } from "./config";
import express, { NextFunction, Application } from 'express';


class App {

  // ------------------------------------------------------ \\
  //              Configure express backend
  // ------------------------------------------------------ \\

  public expressApp: Application = express();

  constructor() {
  }

  public async initialize(): Promise<void> {

    // Setup express stuff
    console.debug("Setting up express server...");
    this.setupExpress();
    console.debug("Finished setting up express server.");


    // setup database
    createConfig("database-config.json", {
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

      loadConfig("database-config.json").then(function (loaded) {
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
    createConfig("image-cdn-config.json", {
      cloud_name: "",
      api_key: "",
      api_secret: ""
    }).then(function (created) {
      if (created) {
        console.log("Created default database config file. Edit it and restart the app.");
        process.exit();
        return;
      }

      loadConfig("image-cdn-config.json").then(function (loaded) {

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

  }

  public setupExpress(): void {
    console.debug("Setting up views");
    this.setupViews();

    console.debug("Using dev logger");
    this.expressApp.use(logger('dev'));

    console.debug("Setting up middleware");
    this.setupMiddleware();

    console.debug("Setting up static directories");
    this.expressApp.use('/images', express.static("public/images"));
    this.expressApp.use(express.static(path.join(__dirname, 'dist')));

    console.debug("Setting up routes");
    this.expressApp.use('/', indexRoute);

    console.debug("Setting up static files to serve");
    this.expressApp.use('*', (_req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));

    console.debug("Setting up error handling");
    this.setupErrorHandling();
  }

  public setupViews(): void {
    // view engine setup 
    this.expressApp.set('views', path.join(__dirname, "../views"));
    this.expressApp.set('view engine', 'ejs');
  }

  public setupMiddleware(): void {
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({
      extended: false
    }));
    this.expressApp.use(cookieParser());
  }

  public setupErrorHandling(): void {
    //catch 404 and forward to error handler
    this.expressApp.use((_req: express.Request, _res: express.Response, next: NextFunction) => {
      next(createError(404));
    });

    // development error handler
    // will print stacktrace
    if (this.expressApp.get('env') === 'development') {

      this.expressApp.use((err: any, _req: express.Request, res: express.Response, _next: NextFunction) => {
        res.status(err['status'] || 500);
        res.render('error', {
          message: err.message,
          error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    this.expressApp.use((err: any, _req: express.Request, res: express.Response, _next: NextFunction) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: {}
      });
    });
  }

}

const app = new App();
export default app.expressApp;
export { app };
