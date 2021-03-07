const utils = require("../../utils/utils");
const { random_fact_apis } = require("../../config").api_urls;

module.exports = {
    name: "fact",
    description: "Learn a new random fact!",
    execute(message) {
        message.channel.send("Retriving a fact...").then(async m => {
            let apiArray = [];
            for (const api in random_fact_apis) {
                apiArray.push(api);
            }
            let num = Math.floor(Math.random()*apiArray.length);
            let data = await utils.http.makeGetRequest(random_fact_apis[apiArray[num]].url);
            let fact = data[random_fact_apis[apiArray[num]].property].replace("`", "'"); // one of the apis are weird and put ` instead of apostrophes
            const factEmbed = new utils.embeds.MrFactualEmbed({ dontIncludeThumbnail: true })
            .setTitle("Did you know...")
            .setDescription(fact)
            m.edit(factEmbed);
            m.edit("");
        });
    }
}