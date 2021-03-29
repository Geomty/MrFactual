const { jsCharacterLimit, evalPaginatorLoading } = require("../../assets/constants");
const { owner, co_owners } = require("../../config").people;

module.exports = {
    name: "jseval",
    description: "Input JavaScript code for me to run.",
    execute(message, args) {
        if (message.author.id == owner.id || message.author.id == co_owners.first.id || message.author.id == co_owners.second.id) {
            let code = args.join(" ");
            if (code.startsWith("```js\n") && code.endsWith("\n```")) {
                code = code.slice(5, -3);
            }
            if (message.author.id != owner.id && code.includes("child_process") || message.author.id != owner.id && code.includes("bateval")) return message.channel.send("Executing batch is a developer only privilege. You could shut down the developer's computer with batch...");
            let result = eval(code);
            let resultString;
            if (result) {
                resultString = result.toString();
            }
            if (resultString && resultString.length > jsCharacterLimit) {
                let multiples = Math.floor(resultString.length / jsCharacterLimit);
                let remainder = resultString.length % jsCharacterLimit;
                let evalPages = [];
                for (i=0;i<multiples*jsCharacterLimit;i+=jsCharacterLimit) {
                    evalPages.push(`\`\`\`\n${resultString.slice(i, i+jsCharacterLimit)}\n\`\`\``);
                }
                if (remainder) {
                    evalPages.push(`\`\`\`\n${resultString.slice(-remainder, resultString.length)}\n\`\`\``);
                }
                message.channel.send(evalPaginatorLoading).then(m => new message.client.utils.paginator.Paginator(message, m, evalPages[0], evalPages));
            } else message.channel.send("```\n" + result + "\n```");
        }
    }
}
