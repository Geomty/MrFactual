const embeds = require("../../utils/embeds")

module.exports = {
    json: {
        name: "ping",
        description: "Am I online? Use this command to find out!"
    },
    response(_, client) {
        const pingEmbed = new embeds.MrFactualSlashEmbed({ dontIncludeThumbnail: true });
        pingEmbed.title = "Pong! :ping_pong:";
        pingEmbed.description = `Bot Latency: Bot latency is currently not supported on slash commands\nAPI Latency: ${client.ws.ping}ms`;
        return {
            type: 4,
            data: {
                embeds: [
                    pingEmbed
                ]
            }
        }
    }
}