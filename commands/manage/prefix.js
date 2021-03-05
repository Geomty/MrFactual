const utils = require("../../utils/utils");
const { prefix } = require("../../config");

module.exports = {
    name: "prefix",
    description: "Set a custom prefix. Put `--` at the end of your new prefix to represent a space.",
    usage: "<new prefix (optional)>",
    async execute(message, args) {
        if (!message.member.permissions.has(32)) {
            return message.channel.send("You need the `MANAGE_SERVER` permission to change my prefix!");
        }
        if (args[0]) {
            if (args[0].endsWith("--") && args[0].length > 2) {
                args[0] = args[0].slice(0, args[0].lastIndexOf("--"));
                args[0] = args[0] + " ";
            }
            const result = await utils.database.findDocument("prefixes", { serverID: message.guild.id });
            if (result) {
                await utils.database.changeDocument("prefixes", result, { $set: { prefix: args[0] } });
                message.channel.send(`Successfully set prefix to \`${args[0]}\`!`);
            } else {
                await utils.database.createDocument("prefixes", { serverID: message.guild.id, prefix: args[0] });
                message.channel.send(`Successfully set prefix to \`${args[0]}\`!`);
            }
        } else {
            const result = await utils.database.findDocument("prefixes", { serverID: message.guild.id });
            if (result) {
                await utils.database.deleteDocument("prefixes", result);
                message.channel.send(`Successfully reset prefix to \`${prefix}\`!`);
            } else {
                message.channel.send(`Successfully reset prefix to \`${prefix}\`!`);
            }
        }
    }
}