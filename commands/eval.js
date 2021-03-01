const { owner, coOwners } = require("../config");

module.exports = {
    name: "eval",
    description: "Input JavaScript code for me to run.",
    hidden: true,
    execute(message, args) {
        if (message.author.id == owner.id || message.author.id == coOwners.one.id || message.author.id == coOwners.two.id) {
            let result = eval(args.join(" "));
            message.channel.send("```\n" + result + "\n```");
        }
    }
}
