const { factLoading, factEmbedTitle } = require("../../assets/constants");
const { random_fact_apis } = require("../../config").api_urls;

module.exports = {
    name: "fact",
    description: "Learn a new random fact!",
    execute(message) {
        message.channel.send(factLoading).then(async m => {
            const data = await message.client.utils.api.selectRandomApi(random_fact_apis);
            let fact = data.res[random_fact_apis[data.num].property].replace("`", "'"); // one of the apis are weird and puts ` instead of apostrophes
            const factEmbed = new message.client.utils.embeds.MrFactualEmbed({ dontIncludeThumbnail: true })
            .setTitle(factEmbedTitle)
            .setDescription(fact)
            m.edit(factEmbed);
            m.edit("");
        });
    }
}
