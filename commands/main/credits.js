const { owner, co_owners, inspiration_bot } = require("../../config").people;

module.exports = {
    name: "credits",
    description: "View everyone who helped make me!",
    execute(message) {
        const creditsEmbed = new message.client.utils.embeds.MrFactualEmbed()
        .setTitle("The people below helped make me!")
        .setDescription("Make sure to thank them!")
        .addFields(
            { name: "Developer:", value: owner.tag },
            { name: "Inspiration for my name:", value: co_owners.first.tag },
            { name: "Inspiration for my purpose:", value: `${inspiration_bot.tag} by ${co_owners.second.tag}` }
        )
        message.channel.send({ embeds: [creditsEmbed] });
    }
}