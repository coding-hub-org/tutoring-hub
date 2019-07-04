import path from 'path';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cloudinary from 'cloudinary';
import express, { NextFunction, Application } from 'express';
import fetch from "node-fetch";

import indexRoute from "./routes/index";
import { ConfigManager, DatabaseConfig } from './config';


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

        // database configuration
        await new ConfigManager().initialize();
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
