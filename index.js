const { MrFactualClient } = require("./utils/client");
const chalk = require("chalk");
require("dotenv").config();

const client = new MrFactualClient();
console.log(client.handlers);

client.once("ready", () => {
    console.log(chalk.greenBright("Mr. Factual is ready to go!"));
    client.user.setActivity("you learn", { type: "WATCHING" });
    const databaseClient = new client.utils.db.Database();
    client.databaseClient = databaseClient.client; // lol

    for (const command of client.slash) {
        client.api.applications(client.user.id).commands.post({
            data: command[1].json
        });
    }
    console.log(chalk.yellowBright("Slash commands are ready to go!"));
});

client.ws.on("INTERACTION_CREATE", interaction => {
    client.handlers.slashCommandHandler(interaction, client);
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
