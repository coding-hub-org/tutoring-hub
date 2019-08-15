import path from "path";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import express, { NextFunction, Application } from "express";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import fetch from "node-fetch";
import cors from "cors";
import indexRoute from "./routes";
import { ConfigManager } from "./config-manager";

class App {
	// ------------------------------------------------------ \\
	//              Configure express backend
	// ------------------------------------------------------ \\

	public expressApp: Application = express();
	private configManager!: ConfigManager;

	constructor() {}

	public async initialize(): Promise<void> {
		// Setup express stuff
		console.debug("Setting up express server...");
		this.setupExpress();
		console.debug("Finished setting up express server.");

		// initialize configuration manager
		try {
			this.configManager = new ConfigManager();
			await this.configManager.initialize();
			console.log("Initialized the configuration manager");
		} catch (error) {
			console.error("Could not initialize the configuration manager");
			throw error;
		}

		// test Mongoose database connection
		try {
			await this.testMongooseConnection();
			console.log("Successfully connected to the database");
		} catch (error) {
			console.error("Could not connect to the database");
			throw error;
		}

		// Test Cloudinary connection
		if (this.configManager.imageConfig.useCloudinary) {
			try {
				await this.testCloudinaryConnection();
				console.log("Successfully connected to the Cloudinary CDN");
			} catch (error) {
				console.error("Could not connect to the Cloudinary CDN");
				throw error;
			}
		}

		console.log("Server finished initialization");
	}

	public async testMongooseConnection(): Promise<void> {
		const dbUsername = this.configManager.databaseConfig.username;
		const dbPassword = this.configManager.databaseConfig.password;
		const databaseURL = this.configManager.databaseConfig.url
			.replace("{username}", dbUsername)
			.replace("{password}", dbPassword);
		const useNewUrlParser = this.configManager.databaseConfig.useNewUrlParser;

		try {
			await mongoose.connect(databaseURL, {
				useNewUrlParser: useNewUrlParser
			});
			mongoose.Promise = global.Promise;
			const db = mongoose.connection;
			//Bind connection to error event (to get notification of connection errors)
			db.on("error", console.error.bind(console, "MongoDB connection error:"));
		} catch (error) {
			throw error;
		}
	}

	public async testCloudinaryConnection(): Promise<void> {
		const url = "https://API_KEY:API_SECRET@api.cloudinary.com/v1_1/CLOUD_NAME/resources/image"
			.replace("API_KEY", this.configManager.imageConfig.cloudinaryAPIKey)
			.replace("API_SECRET", this.configManager.imageConfig.cloudinaryAPISecret)
			.replace(
				"CLOUD_NAME",
				this.configManager.imageConfig.cloudinaryCloudName
			);

		try {
			const value = await fetch(url);
			if (value.status !== 200) {
				throw new Error(
					`Cloudinary API returned bad status code: ${value.status}`
				);
			}

			cloudinary.config({
				API_KEY: this.configManager.imageConfig.cloudinaryAPIKey,
				API_SECRET: this.configManager.imageConfig.cloudinaryAPISecret,
				CLOUD_NAME: this.configManager.imageConfig.cloudinaryCloudName
			});
		} catch (error) {
			throw error;
		}
	}

	public setupExpress(): void {
		console.debug("Setting up views");
		this.setupViews();

		console.debug("Using dev logger");
		this.expressApp.use(logger("dev"));

		console.debug("Setting up middleware");
		this.setupMiddleware();

		console.debug("Setting up static directories");
		this.expressApp.use(express.static(path.join(__dirname, "../public")));

		console.debug("Setting up routes");
		this.expressApp.use("/", indexRoute);

		console.debug("Setting up error handling");
		this.setupErrorHandling();
	}

	public setupViews(): void {
		// view engine setup
		this.expressApp.set("views", path.join(__dirname, "../views"));
		this.expressApp.set("view engine", "ejs");
	}

	public setupMiddleware(): void {
		this.expressApp.use(express.json());
		this.expressApp.use(
			express.urlencoded({
				extended: false
			})
		);
		this.expressApp.use(cookieParser());
		this.expressApp.use(cors());
	}

	public setupErrorHandling(): void {
		//catch 404 and forward to error handler
		this.expressApp.use(
			(_req: express.Request, _res: express.Response, next: NextFunction) => {
				next(createError(404));
			}
		);

		// development error handler
		// will print stacktrace
		if (this.expressApp.get("env") === "development") {
			this.expressApp.use(
				(
					err: any,
					_req: express.Request,
					res: express.Response,
					_next: NextFunction
				) => {
					res.status(err["status"] || 500);
					res.render("error", {
						message: err.message,
						error: err
					});
				}
			);
		}

		// production error handler
		// no stacktraces leaked to user
		this.expressApp.use(
			(
				err: any,
				_req: express.Request,
				res: express.Response,
				_next: NextFunction
			) => {
				res.status(err.status || 500);
				res.render("error", {
					message: err.message,
					error: {}
				});
			}
		);
	}
}

const app = new App();
export default app.expressApp;
export { app };
