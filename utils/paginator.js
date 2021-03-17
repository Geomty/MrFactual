class Paginator {
    constructor(message, m, firstMessage, messagesArray) {
        this.message = message;
        this.m = m;
        this.firstMessage = firstMessage;
        this.messagesArray = messagesArray;
        this.createPaginator();
    }
    async createPaginator() {
        await this.m.react("⏪")
        .then(await this.m.react("⬅"))
        .then(await this.m.react("➡"))
        .then(await this.m.react("⏩"))
        .then(await this.m.react("⏹"))
        .then(this.m.edit(this.firstMessage))
        .then(this.m.edit(""));
        let page = 0;
        const collector = this.m.createReactionCollector((_, user) => user.id == this.message.author.id);
        this.changeThePage(collector, page);
    }
    changeThePage(collector, page) {
        collector.on("collect", reaction => {
            reaction.users.remove(this.message.author.id);
            switch (reaction.emoji.name) {
                case "⏪":
                    page = 0;
                    break;
                case "⬅":
                    page = (page != 0) ? page - 1 : page;
                    break;
                case "➡":
                    page = (page != this.messagesArray.length - 1) ? page + 1 : page;
                    break;
                case "⏩":
                    page = this.messagesArray.length - 1;
                    break;
               case "⏹":
                    return this.deletePaginator(collector);
                    break;
            }
            this.m.edit(this.messagesArray[page]);
        });
    }
    deletePaginator(collector) {
        collector.off("collect", () => {});
        this.m.reactions.removeAll();
        this.m.edit("This menu has successfully been closed.");
    }
}

module.exports = { Paginator };
