import fs from 'fs';

interface Serializable<T> {
    deserialize(input: Object): T;
}

export class ConfigManager {

    public databaseConfig!: DatabaseConfig;
    public imageConfig!: ImageConfig;

    constructor() {
    }

    public async initialize() {
        return new Promise(async (resolve, reject) => {
            let self = this;

            // Create database config
            await ConfigManager.createIfNotExistsAndLoad<DatabaseConfig>(
                'database.config.json',
                DatabaseConfig,
                ['database.config.json']
            )
                .then(function (resultObj: any) {
                    if (resultObj.created) {
                        console.log("Created database config!");
                    }
                    self.databaseConfig = resultObj.loaded;
                    console.log("Loaded database config");
                }).catch(function (err) {
                    return reject(err);
                });

            // Create image config
            await ConfigManager.createIfNotExistsAndLoad<ImageConfig>(
                'images.config.json',
                ImageConfig,
                ['images.config.json']
            )
                .then(function (resultObj: any) {
                    if (resultObj.created) {
                        console.log("Created images config!");
                    }
                    self.imageConfig = resultObj.loaded;
                    console.log("Loaded images config");
                }).catch(function (err) {
                    return reject(err);
                });

            return resolve();
        });
    }

    public static async createIfNotExists<T extends ConfigBase>(path: string, base: { new(...args: any[]): T; }, baseArgs: any[]): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.promises.access(path, fs.constants.W_OK)
                .then(function () {
                    return resolve(false);
                })
                .catch(function (_err) {
                    new base(...baseArgs).save()
                        .then(function () {
                            return resolve(true);
                        }).catch(function (err) {
                            return reject(err);
                        });
                });
        });
    }

    public static async load<T extends ConfigBase>(path: string, base: { new(...args: any[]): T; }, baseArgs: any[]): Promise<ConfigBase> {
        return new Promise((resolve, reject) => {
            fs.promises.access(path, fs.constants.R_OK)
                .then(function () {
                    fs.promises.readFile(path, {
                        encoding: 'utf8'
                    })
                        .then(function (rawData) {
                            let data = JSON.parse(rawData);
                            let deserialized: ConfigBase = new base(...baseArgs).deserialize(data);
                            return resolve(deserialized);
                        })
                        .catch(function (err: any) {
                            return reject(err);
                        });
                })
                .catch(function (err: any) {
                    return reject(err);
                });
        });
    }

    public static createIfNotExistsAndLoad<T extends ConfigBase>(path: string, base: { new(...args: any[]): T; }, baseArgs: any[]): Promise<{}> {
        return new Promise((resolve, reject) => {
            ConfigManager.createIfNotExists(path, base, baseArgs)
                .then(function (created: boolean) {
                    ConfigManager.load(path, base, baseArgs)
                        .then(function (loaded: ConfigBase) {
                            return resolve({ created: created, loaded: loaded });
                        })
                        .catch(function (err: any) {
                            return reject(err);
                        });
                })
                .catch(function (err: any) {
                    return reject(err);
                });
        });
    }
}

abstract class ConfigBase implements Serializable<ConfigBase> {

    public configPath: string;

    constructor(configPath: string) {
        this.configPath = configPath;
    }

    // public abstract deserialize(input: any): ConfigBase;

    public deserialize(input: any): ConfigBase {
        Object.keys(input).forEach(key => {
            this[key] = input[key];
        });
        return this;
    }

    public async save(): Promise<void> {
        let self = this;
        return new Promise((resolve, reject) => {
            // writes the file asynchronously with 4-spaced tabbing
            fs.promises.writeFile(self.configPath, JSON.stringify(self, null, 4), null)
                .then(function () {
                    return resolve();
                }).catch(function (err) {
                    return reject(err);
                });
        });
    }
}

export class DatabaseConfig extends ConfigBase {
    public username: string = "";
    public password: string = "";
    public url: string = "mongodb://localhost/tutoring-hub";
    public useNewUrlParser: boolean = true;
}

export class ImageConfig extends ConfigBase {
    public useCloudinary: boolean = true;
    public cloudinaryAPIKey: string = "CLOUDINARY_API_KEY";
    public cloudinaryAPISecret: string = "CLOUDINARY_API_SECRET";
    public cloudinaryCloudName: string = "CLOUDINARY_CLOUD_NAME";

}