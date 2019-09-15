import { ConfigIOResult, ConfigurationUtilities } from 'cardboard-config';
import { Logger } from '@michaelgatesdev/common';

import { app } from "./app";
import { DatabaseConfig } from "./configs/database-config";
import { ImagesConfig } from "./configs/images-config";

export class ConfigManager {

    public databaseConfig?: DatabaseConfig;
    public imagesConfig?: ImagesConfig;

    public async initialize(): Promise<void> {
        // Create and load database config
        try {
            const result: ConfigIOResult = await ConfigurationUtilities.createIfNotExistsAndLoad<DatabaseConfig>(
                DatabaseConfig,
                [
                    `${app.SETTINGS_DIR}/database-config.json`
                ]
            );
            if (result.wasCreated) {
                Logger.info("Created database config!");
            }
            this.databaseConfig = result.loaded as DatabaseConfig;
            Logger.info("Loaded database config");
        } catch (error) {
            throw error;
        }

        // Create and load images config
        try {
            const result: ConfigIOResult = await ConfigurationUtilities.createIfNotExistsAndLoad<ImagesConfig>(
                ImagesConfig,
                [
                    `${app.SETTINGS_DIR}/application-config.json`
                ]
            );
            if (result.wasCreated) {
                Logger.info("Created database config!");
            }
            this.imagesConfig = result.loaded as ImagesConfig;
            Logger.info("Loaded database config");
        } catch (error) {
            throw error;
        }
    }
}
