module.exports.createPaginator = async (message, m, firstEmbed, embedsArray) => {
    await m.react("⏪")
    .then(await m.react("⬅"))
    .then(await m.react("➡"))
    .then(await m.react("⏩"))
    .then(m.edit(firstEmbed))
    .then(m.edit(""));
    let page = 0;
    const collector = m.createReactionCollector((_, user) => user.id == message.author.id);
    collector.on("collect", reaction => {
        reaction.users.remove(message.author.id);
        switch (reaction.emoji.name) {
            case "⏪":
                page = 0;
                break;
            case "⬅":
                page = (page != 0) ? page - 1 : page;
                break;
            case "➡":
                page = (page != embedsArray.length - 1) ? page + 1 : page;
                break;
            case "⏩":
                page = embedsArray.length - 1;
                break;
            }
            m.edit(embedsArray[page]);
        }
    );
}
