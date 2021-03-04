const { owner, co_owners } = require("../config");

module.exports = {
    name: "eval",
    description: "Input JavaScript code for me to run.",
    hidden: true,
    execute(message, args) {
        if (message.author.id == owner.id || message.author.id == co_owners.first.id || message.author.id == co_owners.second.id) {
            let result = eval(args.join(" "));
            message.channel.send("```\n" + result + "\n```");
        }
    }
}
