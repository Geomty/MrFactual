const Discord = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");
const utils = require("./utils/utils");
const handlers = require("./handlers/handlers");
const dotenv = require("dotenv");
dotenv.config();

const client = new utils.client.MrFactualClient();

client.once("ready", () => {
    console.log(chalk.greenBright("Mr. Factual is ready to go!"));
    client.user.setActivity("you learn", { type: "WATCHING" });
    const databaseClient = new utils.database.Database();
    client.databaseClient = databaseClient.client; // lol

    for (const command of client.slash) {
        client.api.applications(client.user.id).commands.post({
            data: command[1].json
        });
    }
    console.log(chalk.yellowBright("Slash commands are ready to go!"));
});

client.ws.on("INTERACTION_CREATE", interaction => {
    handlers.slashCommandHandler(interaction, client);
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

client.login(process.env.TOKEN);
