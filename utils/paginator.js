const { reallyLeftArrow, leftArrow, rightArrow, reallyRightArrow, stopButton, paginatorClose } = require("../assets/constants");

class Paginator {
    constructor(message, m, firstMessage, messagesArray) {
        this.message = message;
        this.m = m;
        this.firstMessage = firstMessage;
        this.messagesArray = messagesArray;
        this.createPaginator();
    }
    async createPaginator() {
        await this.m.react(reallyLeftArrow)
        .then(await this.m.react(leftArrow))
        .then(await this.m.react(rightArrow))
        .then(await this.m.react(reallyRightArrow))
        .then(await this.m.react(stopButton))
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
                case reallyLeftArrow:
                    page = 0;
                    break;
                case leftArrow:
                    page = (page != 0) ? page - 1 : page;
                    break;
                case rightArrow:
                    page = (page != this.messagesArray.length - 1) ? page + 1 : page;
                    break;
                case reallyRightArrow:
                    page = this.messagesArray.length - 1;
                    break;
               case stopButton:
                    return this.deletePaginator(collector);
            }
            this.m.edit(this.messagesArray[page]);
        });
    }
    deletePaginator(collector) {
        collector.off("collect", () => {});
        this.m.reactions.removeAll();
        this.m.edit(paginatorClose);
    }
}

module.exports = { Paginator };
