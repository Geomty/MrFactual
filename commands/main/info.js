const Discord = require("discord.js");
const utils = require("../../utils/utils")
const { owner } = require("../../config").people;

module.exports = {
    name: "info",
    description: "This command shows detailed information about me.",
    execute(message) {
        const infoEmbed = new utils.embeds.MrFactualEmbed()
        .setTitle("Free information about me!")
        .setDescription("Woohoo!")
        .addFields(
            { name: "Creator:", value: owner.tag },
            { name: "Stats:", value: `${message.client.guilds.cache.size} Servers\n${message.client.channels.cache.size} Channels\n${message.client.users.cache.size} Users` },
            { name: "Made with:", value: `Discord.js v${Discord.Constants.Package.version.slice(11, Discord.Constants.Package.version.length)}\nNode.js ${process.version}` },
            { name: "Uptime:", value: `${Math.floor(message.client.uptime/1000/60)} Minutes` },
            { name: "Links:", value: "Invite link: [Click here](https://discord.com/oauth2/authorize?client_id=812869459374243872&permissions=379968&scope=applications.commands%20bot)\nSupport server: [Click here](https://discord.gg/yXkB68EA8S)\nGitHub repository: [Click here](https://github.com/Geomty/MrFactual)" },
            { name: "Created on:", value: message.client.user.createdAt }
        )
        message.channel.send(infoEmbed);
    }
}
