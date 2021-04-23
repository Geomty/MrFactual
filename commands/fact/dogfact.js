const { factLoading, factEmbedTitle } = require("../../assets/constants");
const { dog_fact_apis } = require("../../config").api_urls, { dog_image_apis } = require("../../config").api_urls;

module.exports = {
    name: "dogfact",
    description: "Learn a new random dog fact!",
    execute(message) {
        message.channel.send(factLoading).then(async m => {
            const data = await message.client.utils.api.selectRandomApi(dog_fact_apis);
            let fact;
            let dataTwo;
            let image;
            do {
                dataTwo = await message.client.utils.api.selectRandomApi(dog_image_apis);
                image = dataTwo.res[dog_image_apis[dataTwo.num].property];
            } while (image.endsWith(".mp4")); // one of the dog image apis sends VIDEOS
            switch (data.num) {
                case "first":
                    fact = data.res[dog_fact_apis[data.num].property][0];
                    break;
                case "second":
                    fact = data.res[dog_fact_apis[data.num].property];
                    break;
                case "third":
                    fact = data.res[0][dog_fact_apis[data.num].property];
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
