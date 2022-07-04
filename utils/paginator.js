// not updated for slash commands and will be used when i need it
const Discord = require("discord.js");
const { paginatorClose } = require("../assets/constants");

class Paginator {
    constructor(message, pages) {
        this.message = message;
        this.pages = pages;
        this.createPaginator();
    }
    createPaginator() {
        let responseData = this.baseData = {
            components: [new Discord.MessageActionRow().addComponents([
                new Discord.MessageButton()
                .setLabel("First page")
                .setStyle("SUCCESS")
                .setCustomId("first_page"),

                new Discord.MessageButton()
                .setLabel("Previous page")
                .setStyle("PRIMARY")
                .setCustomId("previous_page"),

                new Discord.MessageButton()
                .setLabel("Next page")
                .setStyle("PRIMARY")
                .setCustomId("next_page"),

                new Discord.MessageButton()
                .setLabel("Last page")
                .setStyle("SUCCESS")
                .setCustomId("last_page"),

                new Discord.MessageButton()
                .setLabel("Stop")
                .setStyle("DANGER")
                .setCustomId("stop")
            ])]
        }
        this.stringOrEmbed(responseData, this.pages[0]);
        this.message.channel.send(responseData).then(m => this.m = m);
        this.changeThePage();
    }
    changeThePage() {
        let page = 0;
        this.message.client.on("interactionCreate", interaction => {
            if (interaction.componentType == "BUTTON" && interaction.message.id == this.m.id) {
                if (interaction.user.id == this.message.author.id) {
                    switch (interaction.customId) {
                        case "first_page":
                            page = 0;
                            break;
                        case "previous_page":
                            page = (page != 0) ? page - 1 : page;
                            break;
                        case "next_page":
                            page = (page != this.pages.length - 1) ? page + 1 : page;
                            break;
                        case "last_page":
                            page = this.pages.length - 1;
                            break;
                        case "stop":
                            return this.deletePaginator(interaction);
                    }
                    let editData = this.baseData;
                    this.stringOrEmbed(editData, this.pages[page]);
                    interaction.update(editData);
                } else interaction.reply({ content: "Sorry, but this is not your menu.", ephemeral: true });
            }
        });
    }
    deletePaginator(interaction) {
        let editData = this.baseData;
        for (let i=0;i<editData.components[0].components.length;i++) {
            editData.components[0].components[i].setDisabled(true);
        }
        editData.content = paginatorClose;
        interaction.update(editData);
    }
    stringOrEmbed(object, content) {
        if (typeof content == "string") {
            object.content = content;
        } else {
            object.embeds = [content];
        }
    }
}

module.exports = { Paginator };
