const { MessageEmbed } = require("discord.js");

class MrFactualEmbed extends MessageEmbed {
    constructor(options = {}) {
        super();
        this.setColor("RANDOM");
        this.setFooter("Thanks for using me!");
        if (!options.dontIncludeThumbnail) {
            this.setThumbnail("https://raw.githubusercontent.com/Geomty/MrFactual/main/assets/MrFactualTemporaryLogo.jpg");
        }
    }
}

module.exports = MrFactualEmbed;
