const FactCommand = require("./classes/basefact");

module.exports = new FactCommand("", (data, apis) => {
    return data.res[apis[data.num].property].replace("`", "'"); // one of the apis are weird and puts ` instead of apostrophes
}, false, false);