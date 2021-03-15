const { MessageEmbed } = require("discord.js");

class MrFactualEmbed extends MessageEmbed {
    constructor(options = {}) {
        super();
        this.setColor("RANDOM");
        this.setFooter("Thanks for using me!");
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
        this.footer = { text: "Thanks for using me!" };
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
