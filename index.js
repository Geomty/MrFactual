const MrFactualClient = require("./client/client");
const chalk = require("chalk");
require("dotenv").config();

const client = new MrFactualClient();

client.once("ready", () => {
    console.log(chalk.greenBright("Mr. Factual is ready to go!"));
    client.user.setActivity("you learn", { type: "WATCHING" });
    /*const databaseClient = new client.db();
    client.databaseClient = databaseClient.client;*/ // lol
});

client.on("guildCreate", client.handlers.createdGuildHandler);

client.on("message", message => {
    client.handlers.messageHandler(message);
    module.exports = message;
});

process.on("unhandledRejection", error => {
    if (error.message == "Missing Permissions") {
        client.handlers.errorHandler.missingPermissions(require("./index"));
    }
});

client.login(process.env.TOKEN);
