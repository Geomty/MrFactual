const { Permissions } = require("discord.js");
const { woohoo, day, hour, minute } = require("../../assets/constants");
const { owner } = require("../../config").people;
const packages = require("../../package").dependencies;

module.exports = {
    name: "info",
    description: "This command shows detailed information about me.",
    execute(message) {
        const perms = Permissions.FLAGS;
        let infoMessage = "";
        for (const package in packages) {
            infoMessage += `${package.charAt(0).toUpperCase() + package.slice(1)} v${packages[package].slice(1, packages[package].length)}\n`;
        }
        let infoMessage2 = [];
        let uptime = message.client.uptime;
        if (((uptime/day) >= 1) || ((uptime/hour) >= 1) || ((uptime/minute) >= 1)) {
            if ((uptime/day) >= 1) {
                infoMessage2.push(`${Math.floor(uptime/day)} day(s)`);
                uptime -= day*Math.floor(uptime/day);
            }
            if ((uptime/hour) >= 1) {
                infoMessage2.push(`${Math.floor(uptime/hour)} hour(s)`);
                uptime -= hour*Math.floor(uptime/hour);
            }
            if ((uptime/minute) >= 1) {
                infoMessage2.push(`${Math.floor(uptime/minute)} minute(s)`);
                uptime -= minute*Math.floor(uptime/minute);
            }
        } else {
            infoMessage2.push(`0 minutes`);
        }
        const infoEmbed = new message.client.utils.embeds.MrFactualEmbed()
        .setTitle("Free information about me!")
        .setDescription(woohoo)
        .addFields(
            { name: "Creator:", value: owner.tag },
            { name: "Stats:", value: `${message.client.guilds.cache.size} Servers\n${message.client.channels.cache.size} Channels\n${message.client.users.cache.size} Users` },
            { name: "Programs used:", value: `Node.js ${process.version}` },
            { name: "Packages used:", value: infoMessage },
            { name: "Uptime:", value: infoMessage2.join(", ") },
            { name: "Links:", value: `Invite link: [Click here](${message.client.generateInvite({
                scopes: ["bot"],
                permissions: [
                    perms.VIEW_CHANNEL,
                    perms.SEND_MESSAGES,
                    perms.EMBED_LINKS,
                    perms.ATTACH_FILES,
                    perms.READ_MESSAGE_HISTORY,
                    perms.USE_EXTERNAL_EMOJIS,
                    perms.ADD_REACTIONS
                ]
            })})\nSupport server: [Click here](https://discord.gg/yXkB68EA8S)\nGitHub repository: [Click here](https://github.com/Geomty/MrFactual)` },
            { name: "Created on:", value: message.client.user.createdAt.toString() }
        )
        message.channel.send({ embeds: [infoEmbed] });
    }
}
