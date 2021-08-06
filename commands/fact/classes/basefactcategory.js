const Discord = require("discord.js")
const fs = require("fs");
const { factQuestion } = require("../../../assets/constants");

class FactCategory {
    constructor(categoryType) {
        this.name = `${categoryType}fact`;
        this.description = `Learn a new random ${categoryType} fact!`;
        this.categoryType = categoryType;
    }
    async execute(message) {
        let responseData = {
            content: factQuestion.replace("categoryType", this.categoryType),
            components: [new Discord.MessageActionRow().addComponents(
                new Discord.MessageSelectMenu()
                .setCustomId("selectMenu")
                .setPlaceholder("Click here to choose")
            )]
        };
        for (const file of fs.readdirSync(`./commands/fact/${this.categoryType}/`)) {
            const fact = require(`../${this.categoryType}/${file}`);
            const lowercase = fact.name.slice(0, fact.name.indexOf("fact"));
            responseData.components[0].components[0].addOptions({
                label: lowercase.charAt(0).toUpperCase() + lowercase.slice(1),
                value: lowercase,
                description: fact.description
            });
        }
        const m = await message.channel.send(responseData);
        message.client.on("interactionCreate", interaction => {
            if (interaction.componentType == "SELECT_MENU" && interaction.message.id == m.id) {
                if (interaction.user.id == message.author.id) {
                    const selection = interaction.values[0];
                    interaction.reply(`${selection.charAt(0).toUpperCase() + selection.slice(1)} it is!`)
                    .then(() => require(`../${this.categoryType}/${selection}fact`).execute(message))
                    .then(async () => {
                        let editData = responseData;
                        editData.components[0].components[0].setDisabled(true);
                        await message.client.api.channels(message.channel.id).messages(m.id).patch({ // for some reason i can't use interaction.reply() and interaction.update() on the same interaction
                            data: editData
                        });
                    });
                } else interaction.reply({ content: "Sorry, but this isn't your select menu.", ephemeral: true });
            }
        });
    }
}

module.exports = FactCategory;