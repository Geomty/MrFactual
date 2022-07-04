const { Client } = require("discord.js");
const fs = require("fs");

module.exports = class MrFactualClient extends Client {
    constructor() {
        super({ intents: [] });

        this.utils = {};
        const utilFiles = fs.readdirSync("./utils/").filter(file => file.endsWith(".js"));
        for (const file of utilFiles) {
            const util = require(`./utils/${file}`);
            this.utils[file.split(".")[0]] = util;
        }

        this.commands = this.utils.commands.makeCommandCollection();
    }
}
