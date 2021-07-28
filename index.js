const MrFactualClient = require("./client/client");
const activities = require("./assets/activities");
const chalk = require("chalk");
require("dotenv").config();

const client = new MrFactualClient();

client.once("ready", () => {
    console.log(chalk.greenBright("Mr. Factual is ready to go!"));
    let activity = activities[Math.floor(Math.random()*activities.length)];
    if (activity.type == "STREAMING") {
        client.user.setActivity(activity.message, { type: activity.type, url: activity.url });
    } else {
        client.user.setActivity(activity.message, { type: activity.type });
    }
    setInterval(() => {
        let activity = activities[Math.floor(Math.random()*activities.length)];
        if (activity.type == "STREAMING") {
            client.user.setActivity(activity.message, { type: activity.type, url: activity.url });
        } else {
            client.user.setActivity(activity.message, { type: activity.type });
        }
    }, 20000);
    const databaseClient = new client.db();
    client.databaseClient = databaseClient.client; // lol
});

client.on("guildCreate", client.handlers.createdGuildHandler);

client.on("messageCreate", message => {
    client.handlers.messageHandler(message);
    module.exports = message;
});

process.on("unhandledRejection", error => {
    if (error.message == "Missing Permissions") {
        client.handlers.errorHandler.missingPermissions(require("./index"));
    }
});

if (process.env.BETA == "true") {
    client.login(process.env.BETA_TOKEN);
} else {
    client.login(process.env.MRFACTUAL_TOKEN);
}
