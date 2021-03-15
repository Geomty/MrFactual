module.exports = async (interaction, client) => {
    const command = interaction.data.name.toLowerCase();
    try {
        const response = await client.slash.get(command).response(interaction, client);
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: response
        });
    } catch (err) {
        console.log(err);
    }
}