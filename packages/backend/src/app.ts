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
import { Logger, FileUtils } from "@michaelgatesdev/common";

export const expressApp: express.Application = express();

class App {

	public ROOT_DIR: string = "./";
	public PUBLIC_DIR: string = `${this.ROOT_DIR}/public`;
	public SETTINGS_DIR: string = `${this.PUBLIC_DIR}/settings`;

	public expressApp: Application = express();

	private configManager: ConfigManager;

	constructor() {
		this.configManager = new ConfigManager();
	}

	public async initialize(): Promise<void> {

		// Setup express stuff
		Logger.debug("Setting up express server...");
		this.setupExpress();
		Logger.debug("Finished setting up express server");


		// Setup directories
		Logger.debug("Setting up directories...");
		await this.createDirectories();
		Logger.debug("Finished setting up directories");


		// setup configuration files
		Logger.debug("Setting up configurations...");
		await this.configManager.initialize();
		Logger.debug("Finished setting up configurations");

		// test Mongoose database connection
		try {
			await this.testMongooseConnection();
			Logger.info("Successfully connected to the database");
		} catch (error) {
			Logger.error("Could not connect to the database");
			Logger.error(error);
		}

		// Test Cloudinary connection
		if (this.configManager.imagesConfig !== undefined && this.configManager.imagesConfig.useCloudinary) {
			try {
				await this.testCloudinaryConnection();
				Logger.info("Successfully connected to the Cloudinary CDN");
			} catch (error) {
				Logger.error("Could not connect to the Cloudinary CDN");
				Logger.error(error);
			}
		}

		Logger.info("Server finished initialization");
	}

	private async createDirectories(): Promise<void> {
		if (!await FileUtils.checkExists(this.PUBLIC_DIR)) {
			if (await FileUtils.createDirectory(this.PUBLIC_DIR)) {
				Logger.info(`Created public directory: ${this.PUBLIC_DIR}`);
			}
		}
		if (!await FileUtils.checkExists(this.SETTINGS_DIR)) {
			if (await FileUtils.createDirectory(this.SETTINGS_DIR)) {
				Logger.info(`Created public directory: ${this.SETTINGS_DIR}`);
			}
		}
	}

	public async testMongooseConnection(): Promise<void> {
		if (this.configManager.databaseConfig === undefined) return;
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
			db.on("error", Logger.error.bind(console, "MongoDB connection error:"));
		} catch (error) {
			throw error;
		}
	}

	public async testCloudinaryConnection(): Promise<void> {
		if (this.configManager.imagesConfig === undefined) return;
		const url = "https://API_KEY:API_SECRET@api.cloudinary.com/v1_1/CLOUD_NAME/resources/image"
			.replace("API_KEY", this.configManager.imagesConfig.cloudinaryAPIKey)
			.replace("API_SECRET", this.configManager.imagesConfig.cloudinaryAPISecret)
			.replace(
				"CLOUD_NAME",
				this.configManager.imagesConfig.cloudinaryCloudName
			);

		try {
			const value = await fetch(url);
			if (value.status !== 200) {
				throw new Error(
					`Cloudinary API returned bad status code: ${value.status}`
				);
			}

			cloudinary.config({
				API_KEY: this.configManager.imagesConfig.cloudinaryAPIKey,
				API_SECRET: this.configManager.imagesConfig.cloudinaryAPISecret,
				CLOUD_NAME: this.configManager.imagesConfig.cloudinaryCloudName
			});
		} catch (error) {
			throw error;
		}
	}

	public setupExpress(): void {
		Logger.debug("Setting up views");
		this.setupViews();

		Logger.debug("Using dev logger");
		this.expressApp.use(logger("dev"));

		Logger.debug("Setting up middleware");
		this.setupMiddleware();

		Logger.debug("Setting up static directories");
		this.expressApp.use(express.static(path.join(__dirname, "../public")));

		Logger.debug("Setting up routes");
		this.expressApp.use("/", indexRoute);

		Logger.debug("Setting up error handling");
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

export const app = new App();