const Discord = require("discord.js");
const utils = require("../utils/utils")

module.exports.regularError = (error, message) => {
    utils.secretUtils.secretUtilOne(error);
    const errorEmbed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Something went wrong...")
    .setDescription("Here is the error:\n```\n" + error + "\n```")
    .setFooter("Remember to report this error to the developer!");
    message.channel.send(errorEmbed);
}

module.exports.missingPermissions = message => {
    const errorEmbed = new Discord.MessageEmbed()
    .setColor("#FF0000")
    .setTitle("Permissions Error")
    .setDescription("I was unable to execute that command correctly because I don't have enough permissions! For an ideal experience, I need the View Channels, Send Messages, Embed Links, Attach Files, Read Message History, Use External Emojis, and Add Reactions permissions.")
    .setFooter("Thanks for trying to use me!");
    message.author.send(errorEmbed);
}