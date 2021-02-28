const { ownerID, coOwnerID } = require("../config");

module.exports = {
    name: "eval",
    description: "Input JavaScript code for me to run.",
    hidden: true,
    execute(message, args) {
        if (message.author.id == ownerID || message.author.id == coOwnerID) {
            let result = eval(args.join(" "));
            message.channel.send("```\n" + result + "\n```");
        }
    }
}
