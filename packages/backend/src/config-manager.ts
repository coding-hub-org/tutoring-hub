import fs from 'fs';

// ===================================================================================================================================================== //

interface Serializable<T> {
    deserialize(input: Object): T;
}

export class ConfigUtils {
    public static async createIfNotExists<T extends ConfigBase>(path: string, base: { new(...args: any[]): T; }, baseArgs: any[]): Promise<boolean> {
        try {
            await fs.promises.access(path, fs.constants.W_OK);
            return false;
        } catch (error) {
            try {
                await new base(...baseArgs).save();
                return true;
            } catch (error) {
                throw error;
            }
        }
    }

    public static async load<T extends ConfigBase>(path: string, base: { new(...args: any[]): T; }, baseArgs: any[]): Promise<ConfigBase> {
        try {
            await fs.promises.access(path, fs.constants.R_OK);
            const rawData = await fs.promises.readFile(path, {
                encoding: 'utf8'
            });
            let data = JSON.parse(rawData);
            let deserialized: ConfigBase = new base(...baseArgs).deserialize(data);
            return deserialized;
        } catch (error) {
            throw error;
        }
    }

    public static async createIfNotExistsAndLoad<T extends ConfigBase>(path: string, base: { new(...args: any[]): T; }, baseArgs: any[]): Promise<{ wasCreated: boolean, loaded: ConfigBase }> {
        const wasCreated = await ConfigUtils.createIfNotExists(path, base, baseArgs);
        const loadedConfigBase = await ConfigUtils.load(path, base, baseArgs);
        return { wasCreated: wasCreated, loaded: loadedConfigBase };
    }
}

export abstract class ConfigBase implements Serializable<ConfigBase> {

    public configPath: string;

    constructor(configPath: string) {
        this.configPath = configPath;
    }

    public deserialize(input: any): ConfigBase {
        Object.keys(input).forEach(key => {
            this[key] = input[key];
        });
        return this;
    }

    public async save(): Promise<void> {
        // writes the file asynchronously with 4-spaced tabbing
        await fs.promises.writeFile(this.configPath, JSON.stringify(this, null, 4), null);
    }
}

// ===================================================================================================================================================== //

export class ConfigManager {

    public databaseConfig!: DatabaseConfig;
    public imageConfig!: ImageConfig;

    constructor() {
    }

    public async initialize(): Promise<void> {
        // Create database config
        try {
            let result = await ConfigUtils.createIfNotExistsAndLoad<DatabaseConfig>(
                'database.config.json',
                DatabaseConfig,
                ['database.config.json']
            );
            this.databaseConfig = result.loaded as DatabaseConfig;
            if (result.wasCreated) {
                console.log("Created default database configuration");
            }
            console.log("Loaded database configuration");
        } catch (error) {
            throw error;
        }

        // Create image config
        try {
            let result = await ConfigUtils.createIfNotExistsAndLoad<ImageConfig>(
                'images.config.json',
                ImageConfig,
                ['images.config.json']
            )
            this.imageConfig = result.loaded as ImageConfig;
            if (result.wasCreated) {
                console.log("Created default image configuration");
            }
            console.log("Loaded image configuration");
        } catch (error) {
            throw error;
        }
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