const fs = require("fs");

for (const handler of fs.readdirSync(__dirname)) {
    const handlerName = handler.slice(0, -3);
    if (handlerName != "handlers") {
        const handlerFile = require(`./${handlerName}`);
        module.exports[handlerName] = handlerFile;
    }
}
