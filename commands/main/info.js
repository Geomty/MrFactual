const { woohoo } = require("../../assets/constants");
const { owner } = require("../../config").people;
const packages = require("../../package").dependencies;

module.exports = {
    name: "info",
    description: "This command shows detailed information about me.",
    execute(message) {
        let infoMessage = "";
        for (const package in packages) {
            infoMessage += `${package.charAt(0).toUpperCase() + package.slice(1)} v${packages[package].slice(1, packages[package].length)}\n`;
        }
        let infoMessage2 = [];
        if ((message.client.uptime/1000/60/60/24) >= 1) {
            infoMessage2.push(`${Math.floor(message.client.uptime/1000/60/60/24)} days`);
        }
        if ((message.client.uptime/1000/60/60) >= 1) {
            infoMessage2.push(`${Math.floor(message.client.uptime/1000/60/60)} hours`);
        }
        if ((message.client.uptime/1000/60) >= 1) {
            infoMessage2.push(`${Math.floor(message.client.uptime/1000/60)} minutes`);
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
            { name: "Links:", value: "Invite link: [Click here](https://discord.com/oauth2/authorize?client_id=812869459374243872&permissions=379968&scope=applications.commands%20bot)\nSupport server: [Click here](https://discord.gg/yXkB68EA8S)\nGitHub repository: [Click here](https://github.com/Geomty/MrFactual)" },
            { name: "Created on:", value: message.client.user.createdAt }
        )
        message.channel.send(infoEmbed);
    }
}
