const fs = require("fs");
const utils = require("../utils/utils");
const { prefix } = require("../config");

module.exports = {
    name: "help",
    description: "The help command, shows you a list of every command.",
    async execute(message) {
        let guildPrefix;
        const result = await utils.database.findDocument("prefixes", { serverID: message.guild.id });
        if (!result) {
            guildPrefix = prefix;
        } else {
            guildPrefix = result.prefix;
        }

        let helpMessage = "I'm a bot/teacher just trying to make everyone a little smarter! Here are all my commands:";
        const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(__dirname + `/${file}`);
            if (!command.hidden) {
                helpMessage += `\n\n**${guildPrefix}${command.name} ${command.usage || ""}**\n${command.description}`;
            }
        }
        const helpEmbed = new utils.embeds.MrFactualEmbed()
        .setTitle("Hi, I'm Mr. Factual!")
        .setDescription(helpMessage)
        message.channel.send(helpEmbed);
    }
}
