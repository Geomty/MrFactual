const embeds = require("../../utils/embeds");
const http = require("../../utils/http");
const { factEmbedTitle } = require("../../assets/constants");
const { random_fact_apis } = require("../../config").api_urls;

module.exports = {
    json: {
        name: "fact",
        description: "Learn a new random fact!"
    },
    async response() {
        let apiArray = [];
        for (const api in random_fact_apis) {
            apiArray.push(api);
        }
        let num = Math.floor(Math.random()*apiArray.length);
        let data = await http.makeGetRequest(random_fact_apis[apiArray[num]].url);
        let fact = data[random_fact_apis[apiArray[num]].property].replace("`", "'"); // one of the apis are weird and puts ` instead of apostrophes
        const factEmbed = new embeds.MrFactualSlashEmbed({ dontIncludeThumbnail: true });
        factEmbed.title = factEmbedTitle;
        factEmbed.description = fact;
        return {
            type: 4,
            data: {
                embeds: [
                    factEmbed
                ]
            }
        }
    }
}