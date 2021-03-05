const utils = require("../../utils/utils")

module.exports = {
    name: "ping",
    description: "Am I online? Use this command to find out!",
    execute(message) {
        message.channel.send("Pinging...").then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp;
            const pingEmbed = new utils.embeds.MrFactualEmbed({ dontIncludeThumbnail: true })
            .setTitle("Pong! :ping_pong:")
            .setDescription(`Bot Latency: ${ping}ms\nAPI Latency: ${message.client.ws.ping}ms`)
            m.edit(pingEmbed);
            m.edit("");
        });
    }
}
