module.exports = {
    json: {
        name: "ping",
        description: "Am I online? Use this command to find out!"
    },
    response(_, client) {
        return {
            type: 4,
            data: {
                embeds: [
                    {
                        type: "rich",
                        color: Math.floor(Math.random()*(0xffffff + 1)),
                        title: "Pong! :ping_pong:",
                        description: `Bot Latency: Bot latency is currently not supported on slash commands\nAPI Latency: ${client.ws.ping}ms`,
                        footer: {
                            text: "Thanks for using me!"
                        }
                    }
                ]
            }
        }
    }
}