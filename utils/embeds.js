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

class MrFactualSlashEmbed {
    constructor(options = {}) {
        this.type = "rich";
        this.color = Math.floor(Math.random()*(0xffffff + 1));
        this.footer = { text: embedFooter };
        if (!options.dontIncludeThumbnail) {
            this.thumbnail.url = "https://raw.githubusercontent.com/Geomty/MrFactual/main/assets/MrFactualLogo.jpg";
        }
    }
}

module.exports = {
    MrFactualEmbed,
    MrFactualErrorEmbed,
    MrFactualSlashEmbed
}
