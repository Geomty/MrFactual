const fs = require("fs");

for (const util of fs.readdirSync(__dirname)) {
    const utilName = util.slice(0, -3);
    if (utilName != "utils") {
        const utilFile = require(`./${utilName}`);
        module.exports[utilName] = utilFile;
    }
}
