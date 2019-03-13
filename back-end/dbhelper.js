var mongoose = require('mongoose');
var fs = require('fs');

async function createConfig() {
    return new Promise((resolve, reject) => {
        let configFile = "db-config.json";
        if (!fs.existsSync(configFile)) {
            let config = {
                username: "",
                password: "",
                url: "",
                useNewParser: true
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
        let configFile = "db-config.json";
        var config = JSON.parse(fs.readFileSync(configFile));

        if (!configFile) {
            return reject("There was an error loading the database configuration file.");
        }
        let dbUsername = config.username;
        let dbPassword = config.password;
        let databaseURL = config.url
            .replace("{username}", dbUsername)
            .replace("{password}", dbPassword);

        mongoose.connect(databaseURL, {
            useNewUrlParser: true
        }).then(function () {
            mongoose.Promise = global.Promise;

            var db = mongoose.connection;

            //Bind connection to error event (to get notification of connection errors)
            db.on('error', console.error.bind(console, 'MongoDB connection error:'));

            return resolve();
        }).catch(function (e) {
            return reject(e);
        });
    });
}
exports.connect = connect;