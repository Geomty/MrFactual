const MrFactualClient = require("./client");
const activities = require("./assets/activities");
const chalk = require("chalk");
require("dotenv").config();

const client = new MrFactualClient();

client.once("ready", () => {
    console.log(chalk.blueBright("Mr. Factual is ready to go!"));
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
});

client.on("interactionCreate", interaction => {
    if (interaction.isCommand()) client.commands.get(interaction.commandName).execute(interaction);
});

client.login(process.env.BETA ? process.env.BETA_TOKEN : process.env.MRFACTUAL_TOKEN);