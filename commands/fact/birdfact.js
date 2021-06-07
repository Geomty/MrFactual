const { factLoading, factEmbedTitle } = require("../../assets/constants");
const { bird_fact_apis } = require("../../config").api_urls, { bird_image_apis } = require("../../config").api_urls;

module.exports = {
    name: "birdfact",
    description: "Learn a new random bird fact!",
    execute(message) {
        message.channel.send(factLoading).then(async m => {
            const data = await message.client.utils.api.selectRandomApi(bird_fact_apis);
            const fact = data.res[bird_fact_apis[data.num].property];
            const dataTwo = await message.client.utils.api.selectRandomApi(bird_image_apis);
            const image = dataTwo.res[bird_image_apis[dataTwo.num].property];
            const factEmbed = new message.client.utils.embeds.MrFactualEmbed({ dontIncludeThumbnail: true })
            .setTitle(factEmbedTitle)
            .setDescription(fact)
            .setImage(image);
            m.edit(factEmbed);
            m.edit("");
        });
    }
}