var fs = require('fs');

export async function createConfig(fileName: string, defaultObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
        if (!fs.exists(fileName, function (exists: any) {
            if (exists) {
                return resolve(false);
            }
            fs.writeFile(fileName, JSON.stringify(defaultObj, null, "\t"), (err: any) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                };
                return resolve(true);
            });
        }));
    });
}

export async function loadConfig(fileName: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, function (err: any, data: string) {
            var config = JSON.parse(data);
            if (!config || err) {
                console.log(err);
                return reject("There was an error loading the configuration file. (" + fileName + ")");
            }
            return resolve(config);
        });
    });
}