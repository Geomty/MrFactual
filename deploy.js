const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const chalk = require("chalk");
const { makeCommandCollection } = require("./utils/commands");
require("dotenv").config();
const server = "793577103794634842";

const commands = makeCommandCollection().toJSON().map(command => {
    delete command.execute;
    return command;
});

console.log(chalk.yellow("Deploying slash commands..."));
if (process.env.BETA) {
    const rest = new REST({ version: "10" }).setToken(process.env.BETA_TOKEN);
    rest.put(Routes.applicationGuildCommands("839123675646525493", server), { body: commands }).then(() => {
        console.log(chalk.green(`Sucessfully deployed slash commands to server id ${server}!`));
    }).catch(console.error);
} else {
    const rest = new REST({ version: "10" }).setToken(process.env.MRFACTUAL_TOKEN);
    rest.put(Routes.applicationCommands("812869459374243872"), { body: commands }).then(() => {
        console.log(chalk.green("Sucessfully deployed slash commands globally!"));
    }).catch(console.error);
}