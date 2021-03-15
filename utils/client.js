const { Client, Collection } = require("discord.js");
const fs = require("fs");

class MrFactualClient extends Client {
    constructor() {
        super();

        this.commands = new Collection();
        const commandFolders = fs.readdirSync("../MrFactual/commands/"); // file paths go brrr
        for (const folder of commandFolders) {
            if (folder != "slash") {
                const commandFiles = fs.readdirSync(`../MrFactual/commands/${folder}/`).filter(file => file.endsWith(".js"));
                for (const file of commandFiles) {
                    const command = require(`../commands/${folder}/${file}`);
                    this.commands.set(command.name, command);
                }
            }
        }

        this.slash = new Collection();
        const commandFiles = fs.readdirSync("../MrFactual/commands/slash").filter(file => file.endsWith(".js"));
        for (const file of commandFiles) {
            const command = require(`../commands/slash/${file}`);
            this.slash.set(command.json.name, command);
        }
    }
}

module.exports = { MrFactualClient };
