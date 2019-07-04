import path from 'path';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import express, { NextFunction, Application } from 'express';
import cloudinary from 'cloudinary';
import mongoose from 'mongoose';
import fetch from 'node-fetch';

import indexRoute from "./routes/index";
import { ConfigManager } from './config-manager';


class App {

  // ------------------------------------------------------ \\
  //              Configure express backend
  // ------------------------------------------------------ \\

  public expressApp: Application = express();
  private configManager!: ConfigManager;

  constructor() {
  }

  public async initialize(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      // Setup express stuff
      console.debug("Setting up express server...");
      this.setupExpress();
      console.debug("Finished setting up express server.");

      // configurations
      this.configManager = new ConfigManager();
      await this.configManager.initialize()
        .then(function () {

        })
        .catch(function (err: Error) {
          console.error(err);
          return reject("There was an error intiializing the configuration manager");
        });


      // test Mongoose database connection
      await this.testMongooseConnection()
        .then(function () {
          console.log("Successfully connected to the database");
        })
        .catch(function (err) {
          console.error(err);
          return reject("Could not connect to the database");
        });

      // Test Cloudinary connection
      if (this.configManager.imageConfig.useCloudinary) {
        await this.testCloudinaryConnection()
          .then(function () {
            console.log("Successfully connected to the Cloudinary CDN");
          })
          .catch(function (err) {
            console.error(err);
            return reject("Could not connect to the Cloudinary CDN");
          });
      }

      return resolve();
    });
  }


  public async testMongooseConnection() {
    return new Promise((resolve, reject) => {
      let dbUsername = this.configManager.databaseConfig.username;
      let dbPassword = this.configManager.databaseConfig.password;
      let databaseURL = this.configManager.databaseConfig.url
        .replace("{username}", dbUsername)
        .replace("{password}", dbPassword);
      let useNewUrlParser = this.configManager.databaseConfig.useNewUrlParser;

      mongoose.connect(databaseURL, {
        useNewUrlParser: useNewUrlParser
      }).then(function () {
        mongoose.Promise = global.Promise;

        var db = mongoose.connection;

        //Bind connection to error event (to get notification of connection errors)
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        return resolve();
      }).catch(function (err) {
        return reject(err);
      });
    });
  }

  public async testCloudinaryConnection() {
    return new Promise((resolve, reject) => {
      let url = "https://API_KEY:API_SECRET@api.cloudinary.com/v1_1/CLOUD_NAME/resources/image"
        .replace("API_KEY", this.configManager.imageConfig.cloudinaryAPIKey)
        .replace("API_SECRET", this.configManager.imageConfig.cloudinaryAPISecret)
        .replace("CLOUD_NAME", this.configManager.imageConfig.cloudinaryCloudName);

      let self = this;
      fetch(url).then(function (value) {
        if (value.status == 200) {
          cloudinary.config({
            "API_KEY": self.configManager.imageConfig.cloudinaryAPIKey,
            "API_SECRET": self.configManager.imageConfig.cloudinaryAPISecret,
            "CLOUD_NAME": self.configManager.imageConfig.cloudinaryCloudName,
          });
          return resolve();
        }
        else {
          return reject(new Error("Cloudinary API returned bad status code: " + value.status));
        }
      }).catch(function (err) {
        return reject(err);
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
