const Discord = require("discord.js");
const { suggestion_channel } = require("../../config");

module.exports = {
    name: "suggest",
    description: "Suggest a new idea for me!",
    usage: "<suggestion>",
    execute(message, args) {
        if (!args[0]) {
            return message.channel.send("You can't suggest nothing!");
        }
        const channel = message.client.channels.cache.get(suggestion_channel);
        const suggestEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTitle("A new suggestion has popped up!")
        .setDescription(args.join(" "))
        .setTimestamp();
        channel.send({ embeds: [suggestEmbed] });
        message.channel.send("Your suggestion has been sent to the developers! Maybe it'll get approved, I don't know!");
    }
}