const { owner, coOwners, inspirationBot } = require("../config");
const utils = require("../utils/utils");

module.exports = {
    name: "credits",
    description: "View everyone who helped make me!",
    execute(message) {
        const creditsEmbed = new utils.embeds.MrFactualEmbed()
        .setTitle("The people below helped make me!")
        .setDescription("Make sure to thank them!")
        .addFields(
            { name: "Developer:", value: owner.tag },
            { name: "Inspiration for my name:", value: coOwners.one.tag },
            { name: "Inspiration for my purpose:", value: `${inspirationBot.tag} by ${coOwners.two.tag}` }
        )
        message.channel.send(creditsEmbed);
    }
}