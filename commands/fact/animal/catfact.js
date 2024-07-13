const FactCommand = require("../classes/basefact");

module.exports = new FactCommand("cat", false, (data, apis) => {
    if (data.num == "first") {
        return apis[data.num].url;
    }
    return data.res[apis[data.num].property];
});