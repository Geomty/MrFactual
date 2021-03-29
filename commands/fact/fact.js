const { factLoading, factEmbedTitle } = require("../../assets/constants");
const { random_fact_apis } = require("../../config").api_urls;

module.exports = {
    name: "fact",
    description: "Learn a new random fact!",
    execute(message) {
        message.channel.send(factLoading).then(async m => {
            let apiArray = [];
            for (const api in random_fact_apis) {
                apiArray.push(api);
            }
            let num = Math.floor(Math.random()*apiArray.length);
            let data = await message.client.utils.http.makeGetRequest(random_fact_apis[apiArray[num]].url);
            let fact = data[random_fact_apis[apiArray[num]].property].replace("`", "'"); // one of the apis are weird and puts ` instead of apostrophes
            const factEmbed = new message.client.utils.embeds.MrFactualEmbed({ dontIncludeThumbnail: true })
            .setTitle(factEmbedTitle)
            .setDescription(fact)
            m.edit(factEmbed);
            m.edit("");
        });
    }
}