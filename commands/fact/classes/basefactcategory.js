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
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 3,
                            custom_id: "selectMenu",
                            options: []
                        }
                    ]
                }
            ]
        };
        for (const file of fs.readdirSync(`./commands/fact/${this.categoryType}/`)) {
            const fact = require(`../${this.categoryType}/${file}`);
            const lowercase = fact.name.slice(0, fact.name.indexOf("fact"));
            responseData.components[0].components[0].options.push({
                label: lowercase.charAt(0).toUpperCase() + lowercase.slice(1),
                value: lowercase,
                description: fact.description
            });
        }
        const m = await message.client.api.channels(message.channel.id).messages.post({
            data: responseData
        });
        message.client.ws.on("INTERACTION_CREATE", interaction => {
            if (interaction.data.component_type == 3 && interaction.message.id == m.id && interaction.member.user.id == message.author.id) {
                const selection = interaction.data.values[0];
                message.client.api.interactions(interaction.id, interaction.token).callback.post({
                    data: {
                        type: 4,
                        data: {
                            content: `${selection.charAt(0).toUpperCase() + selection.slice(1)} it is!`
                        }
                    }
                }).then(() => require(`../${this.categoryType}/${selection}fact`).execute(message)).then(async () => {
                    let editData = responseData;
                    editData.components[0].components[0].disabled = true;
                    await message.client.api.channels(message.channel.id).messages(m.id).patch({
                        data: editData
                    });
                });
            }
        });
    }
}

module.exports = FactCategory;