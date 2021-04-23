const { MessageEmbed } = require("discord.js");
const { embedFooter } = require("../assets/constants");

class MrFactualEmbed extends MessageEmbed {
    constructor(options = {}) {
        super();
        this.setColor("RANDOM");
        this.setFooter(embedFooter);
        if (!options.dontIncludeThumbnail) {
            this.setThumbnail("https://raw.githubusercontent.com/Geomty/MrFactual/main/assets/MrFactualLogo.jpg");
        }
    }
}

class MrFactualErrorEmbed extends MessageEmbed {
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
