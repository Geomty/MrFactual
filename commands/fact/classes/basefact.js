const { factLoading, factEmbedTitle } = require("../../../assets/constants");
const { api_urls } = require("../../../config");

// warning: messy code
class FactCommand {
    constructor(factType, factFunction = this.generate, imageFunction = this.generate, image = true) {
        if (!factFunction) factFunction = this.generate;
        if (!imageFunction) imageFunction = this.generate;
        this.name = `${factType}fact`;
        this.description = `Learn a new random ${factType}${factType.length ? " " : ""}fact!`;
        this.factType = factType;
        this.factFunction = factFunction;
        this.imageFunction = imageFunction;
        this.image = image;
    }
    execute(message) {
        this.message = message;
        const fact_apis = api_urls[this.factType.length ? this.factType + "_fact_apis" : "random_fact_apis"];
        const image_apis = this.image ? api_urls[this.factType + "_image_apis"] : {};

        message.channel.send(factLoading).then(async m => {
            const data = await message.client.utils.api.selectRandomApi(fact_apis);
            const fact = await this.factFunction(data, fact_apis);
            const factEmbed = new message.client.utils.embeds.MrFactualEmbed({ dontIncludeThumbnail: true })
            .setTitle(factEmbedTitle)
            .setDescription(fact);
            if (this.image) {
                const dataTwo = await message.client.utils.api.selectRandomApi(image_apis);
                const image = await this.imageFunction(dataTwo, image_apis);
                factEmbed.setImage(image);
            }
            m.edit({ embeds: [factEmbed] });
            m.edit("");
        });
    }
    generate(data, apis) {
        return data.res[apis[data.num].property];
    }
}

module.exports = FactCommand;
