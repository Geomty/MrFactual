const { factEmbedTitle } = require("../../../assets/constants");
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
    async execute(interaction) {
        this.interaction = interaction;
        const fact_apis = api_urls[this.factType.length ? this.factType + "_fact_apis" : "random_fact_apis"];
        const image_apis = this.image ? api_urls[this.factType + "_image_apis"] : {};

        const data = await interaction.client.utils.http.selectRandomApi(fact_apis);
        const fact = await this.factFunction(data, fact_apis);
        const factEmbed = new interaction.client.utils.embeds.MrFactualEmbed({ dontIncludeThumbnail: true })
        .setTitle(factEmbedTitle)
        .setDescription(fact);
        if (this.image) {
            const dataTwo = await interaction.client.utils.http.selectRandomApi(image_apis);
            const image = await this.imageFunction(dataTwo, image_apis);
            factEmbed.setImage(image);
        }
        interaction.reply({ embeds: [factEmbed] });
    }
    generate(data, apis) {
        return data.res[apis[data.num].property];
    }
}

module.exports = FactCommand;
