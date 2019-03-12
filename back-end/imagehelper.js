var fs = require('fs');

function createAndLoadConfig() {
    let configFile = "image-config.json";
    if (!fs.existsSync(configFile)) {
        let config = {
            cloud_name: "",
            api_key: "",
            api_secret: ""
        };
        fs.writeFile(configFile, JSON.stringify(config), (err) => {
            if (err) {
                console.error(err);
                return;
            };
        });
    }

    var config = JSON.parse(fs.readFileSync(configFile));
    exports.config = config;
}
exports.createAndLoadConfig = createAndLoadConfig;