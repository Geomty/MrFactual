const { prefix } = require("../config");

module.exports = async message => {
    const result = await message.client.db.findDocument("prefixes", { serverID: message.guild.id });
    let guildPrefix = (result) ? result.prefix : prefix;

    if (message.content == `<@!${message.client.user.id}>`) message.channel.send(`Hello! I noticed you pinged me! My prefix for this server is \`${guildPrefix}\`!`);
    if (!message.content.startsWith(guildPrefix) || message.author.bot || message.channel.type == "dm") return;

    const args = message.content.slice(guildPrefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if (!message.client.commands.get(command)) return;

    try {
        message.client.commands.get(command).execute(message, args);
    } catch(error) {
        const handlers = require("./handlers");
        handlers.errorHandler.regularError(error, message);
    }
}
