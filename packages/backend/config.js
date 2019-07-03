var fs = require('fs');

async function create(fileName, defaultObj) {
    return new Promise((resolve, reject) => {
        if (!fs.exists(fileName, function (exists) {
            if (exists) {
                return resolve(false);
            }
            fs.writeFile(fileName, JSON.stringify(defaultObj, null, "\t"), (err) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                };
                return resolve(true);
            });
        }));
    });
}
exports.create = create;

async function load(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, function (err, data) {
            var config = JSON.parse(data);
            if (!config || err) {
                console.log(err);
                return reject("There was an error loading the configuration file. (" + fileName + ")");
            }
            return resolve(config);
        });
    });
}
exports.load = load;