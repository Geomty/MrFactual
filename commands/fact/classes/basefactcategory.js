const Discord = require("discord.js")
const fs = require("fs");
const { factQuestion } = require("../../../assets/constants");

class FactCategory {
    constructor(categoryType) {
        this.name = `${categoryType}fact`;
        this.description = `Learn a new random ${categoryType} fact!`;
        this.categoryType = categoryType;
    }
    async execute(interaction) {
        let responseData = {
            content: factQuestion.replace("categoryType", this.categoryType),
            components: [new Discord.ActionRowBuilder().addComponents(
                new Discord.StringSelectMenuBuilder()
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
        const reply = await interaction.reply(responseData);
        const collector = reply.createMessageComponentCollector({ max: 999 });
        collector.on("collect", i => {
            if (i.user.id == interaction.user.id) {
                const selection = i.values[0];
                require(`../${this.categoryType}/${selection}fact`).execute(i)
                .then(async () => {
                    let editData = responseData;
                    editData.components[0].components[0].setDisabled(true);
                    await reply.edit(editData);
                });
            } else i.reply({ content: "Sorry, but this isn't your select menu.", ephemeral: true });
        });
    }
}

module.exports = FactCategory;