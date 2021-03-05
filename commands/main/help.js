const fs = require("fs");
const utils = require("../../utils/utils");
const { prefix } = require("../../config");

module.exports = {
    name: "help",
    description: "The help command, shows you a list of every command.",
    usage: "<command category (optional)>",
    async execute(message, args) {
        let guildPrefix;
        const result = await utils.database.findDocument("prefixes", { serverID: message.guild.id });
        if (!result) {
            guildPrefix = prefix;
        } else {
            guildPrefix = result.prefix;
        }

        let helpMessage = "I'm a bot/teacher just trying to make everyone a little smarter!";
        if (!args[0]) {
            const helpEmbed = new utils.embeds.MrFactualEmbed()
            .setTitle("Hi, I'm Mr. Factual!")
            .setDescription(helpMessage)
            .addFields(
                { name: "Prefix:", value: `\`${guildPrefix}\`` },
                { name: "Command categories:", value: fs.readdirSync("../MrFactual/commands/").join(", ").replace("dev, ", "") + `\n\nUse \`${guildPrefix}help <command category>\` to view all commands in that category!` }
            )
            message.channel.send(helpEmbed);
        } else {
            if (!fs.existsSync(`../MrFactual/commands/${args[0]}`) || args[0] == "dev") return message.channel.send("That command category doesn't exist!");
            const commandFiles = fs.readdirSync(`../MrFactual/commands/${args[0]}/`).filter(file => file.endsWith(".js")); //file paths ahhh
            helpMessage += ` Here are all the commands in the ${args[0].toLowerCase()} category:`
            for (const file of commandFiles) {
                const command = require(`../${args[0]}/${file}`);
                helpMessage += `\n\n**${guildPrefix}${command.name} ${command.usage || ""}**\n${command.description}`;
            }
            const helpEmbed = new utils.embeds.MrFactualEmbed()
            .setTitle("Hi, I'm Mr. Factual!")
            .setDescription(helpMessage)
            message.channel.send(helpEmbed);
        }
    }
}
