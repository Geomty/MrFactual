const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const chalk = require("chalk");
require("dotenv").config();
const server = "793577103794634842";
const command = "1261722934473392234";

console.log(chalk.yellow("Deleting slash command..."));
if (process.env.BETA) {
    const rest = new REST({ version: "10" }).setToken(process.env.BETA_TOKEN);
    rest.delete(Routes.applicationGuildCommand("839123675646525493", server, command)).then(() => {
        console.log(chalk.green(`Sucessfully deleted slash command id ${command} in server id ${server}!`));
    }).catch(console.error);
} else {
    const rest = new REST({ version: "10" }).setToken(process.env.MRFACTUAL_TOKEN);
    rest.delete(Routes.applicationCommand("812869459374243872", command)).then(() => {
        console.log(chalk.green(`Sucessfully deleted slash command ${command} globally!`));
    }).catch(console.error);
}