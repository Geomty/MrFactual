const { Collection } = require("discord.js");
const fs = require("fs");

module.exports.makeCommandCollection = () => {
    const commands = new Collection();

    const commandFiles = fs.readdirSync(`./commands/`).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        commands.set(command.name, command);
    }

    const commandFiles2 = fs.readdirSync(`./commands/fact/`).filter(file => file.endsWith(".js"));
    for (const file2 of commandFiles2) {
        const command2 = require(`../commands/fact/${file2}`);
        commands.set(command2.name, command2);
    }

    return commands;
}