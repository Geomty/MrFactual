const { MessageEmbed } = require("discord.js");
const { logoURL } = require("../config");

class MrFactualEmbed extends MessageEmbed {
    constructor(options = {}) {
        super();
        this.setColor("RANDOM");
        this.setFooter("Thanks for using me!");
        if (!options.dontIncludeThumbnail) {
            this.setThumbnail(logoURL);
        }
    }
}

module.exports = MrFactualEmbed;
