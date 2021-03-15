const utils = require("../../utils/utils");
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
        let data = await utils.http.makeGetRequest(random_fact_apis[apiArray[num]].url);
        let fact = data[random_fact_apis[apiArray[num]].property].replace("`", "'"); // one of the apis are weird and puts ` instead of apostrophes
        const factEmbed = new utils.embeds.MrFactualSlashEmbed({ dontIncludeThumbnail: true });
        factEmbed.title = "Did you know...";
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