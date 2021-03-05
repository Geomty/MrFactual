const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const chalk = require("chalk");
const utils = require("./utils/utils");
const handlers = require("./handlers/handlers");
const { token } = require("./config");

client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync(__dirname + "/commands/");
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(__dirname + `/commands/${folder}/`).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(__dirname + `/commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

client.once("ready", () => {
    console.log(chalk.greenBright("Mr. Factual is ready to go!"));
    client.user.setActivity("you learn", { type: "WATCHING" });
    utils.database.databaseInit();
});

client.on("guildCreate", handlers.createdGuildHandler);

client.on("message", message => {
    handlers.messageHandler(message);
    module.exports = message;
});

process.on("unhandledRejection", error => {
    if (error.message == "Missing Permissions") {
        handlers.errorHandler.missingPermissions(require("./index"));
    }
});

client.login(token);
