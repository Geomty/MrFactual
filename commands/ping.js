module.exports = {
    name: "ping",
    description: "Am I online? Use this command to find out!",
    async execute(interaction) {
        interaction.deferReply().then(() => interaction.fetchReply().then(i => {
            let ping = new Date(i.createdTimestamp).getTime() - interaction.createdTimestamp;
            const pingEmbed = new interaction.client.utils.embeds.MrFactualEmbed({ dontIncludeThumbnail: true })
            .setTitle("Pong! :ping_pong:")
            .setDescription(`Bot Latency: ${ping}ms\nAPI Latency: ${interaction.client.ws.ping}ms`)
            interaction.editReply({ embeds: [pingEmbed] });
        }));
    }
}
