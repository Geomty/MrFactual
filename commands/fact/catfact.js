const { factLoading, factEmbedTitle } = require("../../assets/constants");
const { cat_fact_apis } = require("../../config").api_urls, { cat_image_apis } = require("../../config").api_urls;

module.exports = {
    name: "catfact",
    description: "Learn a new random cat fact!",
    execute(message) {
        message.channel.send(factLoading).then(async m => {
            const data = await message.client.utils.api.selectRandomApi(cat_fact_apis);
            const fact = data.res[cat_fact_apis[data.num].property];
            const dataTwo = await message.client.utils.api.selectRandomApi(cat_image_apis);
            let image;
            if (dataTwo.num == "first") {
                image = cat_image_apis[dataTwo.num].url;
            } else {
                image = dataTwo.res[cat_image_apis[dataTwo.num].property];
            }
            const factEmbed = new message.client.utils.embeds.MrFactualEmbed({ dontIncludeThumbnail: true })
            .setTitle(factEmbedTitle)
            .setDescription(fact)
            .setImage(image);
            m.edit(factEmbed);
            m.edit("");
        });
    }
}