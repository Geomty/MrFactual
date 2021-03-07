const fs = require("fs");
const utils = require("../../utils/utils");
const { prefix } = require("../../config");

module.exports = {
    name: "help",
    description: "The help command, shows you a list of every command.",
    usage: "<command category (optional)>",
    async execute(message) {
        let guildPrefix;
        const result = await utils.database.findDocument("prefixes", { serverID: message.guild.id });
        if (!result) {
            guildPrefix = prefix;
        } else {
            guildPrefix = result.prefix;
        }

        let embedDescription = "";
        let embeds = [];

        const commandFolders = fs.readdirSync("../MrFactual/commands/"); // FILE PATHS BE LIKE HGHFGHIUHIGHFHGUH
        for (const folder of commandFolders) {
            if (folder != "dev") {
                embedDescription += ` Here are all the commands in the ${folder} category:`;
                const commandFiles = fs.readdirSync(`../MrFactual/commands/${folder}/`).filter(file => file.endsWith(".js"));
                for (const file of commandFiles) {
                    const command = require(`../${folder}/${file}`);
                    embedDescription += `\n\n**${guildPrefix}${command.name} ${command.usage || ""}**\n${command.description}`;
                }
                const embed = new utils.embeds.MrFactualEmbed()
                .setTitle(folder.charAt(0).toUpperCase() + folder.slice(1) + " Commands")
                .setDescription(embedDescription)
                embed.category = folder;
                embeds.push(embed);
                embedDescription = "";
            }
        }
        
        embedsOrder = ["main", "fact", "management"];
        embeds.sort((a, b) => embedsOrder.indexOf(a.category) - embedsOrder.indexOf(b.category));

        const helpEmbed = new utils.embeds.MrFactualEmbed()
        .setColor("RANDOM")
        .setTitle("Hi, I'm Mr. Factual!")
        .setDescription(`I'm a bot/teacher just trying to make everyone a little smarter! My prefix for this server is \`${guildPrefix}\`.`)
        .addFields(
            { name: "How to use the menu:", value: "Click the arrow reactions below to \"change\" the page." },
            { name: "Page 1:", value: "You are here" }
        )
        .setFooter("Page 1");
        for (const embed in embeds) {
            helpEmbed.addField(`Page ${parseInt(embed) + 2}:`, `My ${embeds[embed].category} commands`)
            embeds[embed].setFooter(`Page ${parseInt(embed) + 2}`);
        }
        embeds.unshift(helpEmbed);

        message.channel.send("Please wait...").then(async m => {
            await m.react("⏪")
            .then(await m.react("⬅"))
            .then(await m.react("➡"))
            .then(await m.react("⏩"))
            .then(m.edit(helpEmbed))
            .then(m.edit(""));
            let page = 0;
            const collector = m.createReactionCollector((_, user) => user.id == message.author.id);
            collector.on("collect", reaction => {
                reaction.users.remove(message.author.id);
                switch (reaction.emoji.name) {
                    case "⏪":
                        page = 0;
                        break;
                    case "⬅":
                        page = (page != 0) ? page - 1 : page;
                        break;
                    case "➡":
                        page = (page != embeds.length - 1) ? page + 1 : page;
                        break;
                    case "⏩":
                        page = embeds.length - 1;
                        break;
                    }
                    m.edit(embeds[page]);
                }
            );
        });
    }
}
