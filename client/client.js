const { Client, Collection } = require("discord.js");
const fs = require("fs");

module.exports = class MrFactualClient extends Client {
    constructor() {
        super();

        this.commands = new Collection();
        const commandFolders = fs.readdirSync("./commands/");
        for (const folder of commandFolders) {
            if (folder != "slash") {
                const commandFiles = fs.readdirSync(`./commands/${folder}/`).filter(file => file.endsWith(".js"));
                for (const file of commandFiles) {
                    const command = require(`../commands/${folder}/${file}`);
                    this.commands.set(command.name, command);
                }
            }
        }

        this.slash = new Collection();
        const slashCommandFiles = fs.readdirSync("./commands/slash/").filter(file => file.endsWith(".js"));
        for (const file of slashCommandFiles) {
            const slashCommand = require(`../commands/slash/${file}`);
            this.slash.set(slashCommand.json.name, slashCommand);
        }

        this.utils = {};
        const utilFiles = fs.readdirSync("./utils/").filter(file => file.endsWith(".js"));
        for (const file of utilFiles) {
            const util = require(`../utils/${file}`);
            this.utils[file.split(".")[0]] = util;
        }

        this.handlers = {};
        const handlerFiles = fs.readdirSync("./handlers/").filter(file => file.endsWith(".js"));
        for (const file of handlerFiles) {
            const handler = require(`../handlers/${file}`);
            this.handlers[file.split(".")[0]] = handler;
        }

        this.db = require("../db/db");
    }
}
