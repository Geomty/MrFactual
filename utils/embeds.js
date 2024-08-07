const { EmbedBuilder } = require("discord.js");
const { embedFooter } = require("../assets/constants");

class MrFactualEmbed extends EmbedBuilder {
    constructor(options = {}) {
        super();
        this.setColor("Random");
        this.setFooter({ text: embedFooter });
        if (!options.dontIncludeThumbnail) {
            this.setThumbnail("https://raw.githubusercontent.com/Geomty/MrFactual/main/assets/MrFactualLogo.jpg");
        }
    }
}

class MrFactualErrorEmbed extends EmbedBuilder {
    constructor() {
        super();
        this.setColor("#FF0000");
        this.setTitle("Something went wrong...");
    }
}

module.exports = {
    MrFactualEmbed,
    MrFactualErrorEmbed
}
