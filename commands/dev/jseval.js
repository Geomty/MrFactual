const utils = require("../../utils/utils");
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
            if (code.includes("child_process") || code.includes("bateval")) return message.channel.send("Executing batch is a developer only priviledge. You could shut down the developer's computer with batch...");
            let result = eval(code);
            let resultString;
            if (result) {
                resultString = result.toString();
            }
            let characterLimit = 1992;
            if (resultString && resultString.length > characterLimit) {
                let multiples = Math.floor(resultString.length / characterLimit);
                let remainder = resultString.length % characterLimit;
                let evalPages = [];
                for (i=0;i<multiples*characterLimit;i+=characterLimit) {
                    evalPages.push(`\`\`\`\n${resultString.slice(i, i+characterLimit)}\n\`\`\``);
                }
                if (remainder) {
                    evalPages.push(`\`\`\`\n${resultString.slice(-remainder, resultString.length)}\n\`\`\``);
                }
                message.channel.send("Result too large, creating paginator...").then(m => new utils.paginator.Paginator(message, m, evalPages[0], evalPages));
            } else message.channel.send("```\n" + result + "\n```");
        }
    }
}
