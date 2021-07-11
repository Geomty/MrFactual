const { paginatorClose } = require("../assets/constants");

class Paginator {
    constructor(message, pages) {
        this.message = message;
        this.pages = pages;
        this.createPaginator();
    }
    createPaginator() {
        let responseData = {
            components: [
                {
                    type: 1,
                    components: [
                        {
                            type: 2,
                            label: "First page",
                            style: 3,
                            custom_id: "first_page"
                        },
                        {
                            type: 2,
                            label: "Previous page",
                            style: 1,
                            custom_id: "previous_page"
                        },
                        {
                            type: 2,
                            label: "Next page",
                            style: 1,
                            custom_id: "next_page"
                        },
                        {
                            type: 2,
                            label: "Last page",
                            style: 3,
                            custom_id: "last_page"
                        }/*,
                        {
                            type: 2,
                            label: "Stop",
                            style: 4,
                            custom_id: "stop"
                        }*/
                    ]
                }
            ]
        }
        this.stringOrEmbed(responseData, this.pages[0]);
        this.message.client.api.channels(this.message.channel.id).messages.post({ data: responseData }).then(m => this.m = m);
        this.changeThePage();
    }
    changeThePage() {
        let page = 0;
        this.message.client.ws.on("INTERACTION_CREATE", interaction => {
            if (interaction.data.component_type == 2 && interaction.message.id == this.m.id && interaction.member.user.id == this.message.author.id) {
                switch (interaction.data.custom_id) {
                    case "first_page":
                        page = 0;
                        break;
                    case "previous_page":
                        page = (page != 0) ? page - 1 : page;
                        break;
                    case "next_page":
                        page = (page != this.pages.length - 1) ? page + 1 : page;
                        break;
                    case "last_page":
                        page = this.pages.length - 1;
                        break;
                    /*case "stopButton":
                        return this.deletePaginator();*/
                }
                let editData = { type: 7, data: {} };
                this.stringOrEmbed(editData.data, this.pages[page], true);
                this.message.client.api.interactions(interaction.id, interaction.token).callback.post({ data: editData });
            }
        });
    }
    deletePaginator() {
        // to be continued once discord updates their documentation and tells me how to edit buttons
    }
    stringOrEmbed(object, content, edit) {
        if (typeof content == "string") {
            object.content = content;
        } else {
            let json = content.toJSON();
            if (edit) {
                object.embeds = [json];
            } else {
                object.embed = json;
            }
        }
    }
}

module.exports = { Paginator };
