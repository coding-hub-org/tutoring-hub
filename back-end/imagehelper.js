var mongoose = require('mongoose');
var fs = require('fs');

async function createConfig() {
    return new Promise((resolve, reject) => {
        let configFile = "image-config.json";
        if (!fs.existsSync(configFile)) {
            let config = {
                api_key: "",
                api_key_secret: "",
            };
            fs.writeFile(configFile, JSON.stringify(config), (err) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                };
            });
            return resolve(true);
        }
        return resolve(false);
    });
}
exports.createConfig = createConfig;


async function connect() {
    return new Promise((resolve, reject) => {
        let configFile = "image-config.json";
        var config = JSON.parse(fs.readFileSync(configFile));

        if (!configFile) {
            return reject("There was an error loading the database configuration file.");
        }

        let key = config.api_key;
        let secret = config.api_key_secret;

        //TODO connect
    });
}
exports.connect = connect;