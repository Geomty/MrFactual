const child_process = require("child_process");
const utils = require("../../utils/utils");
const handlers = require("../../handlers/handlers");
const { owner, co_owners } = require("../../config").people;

module.exports = {
    name: "bateval",
    description: "Input Batch code for me to run.",
    execute(message, args) {
        if (message.author.id == owner.id) {
            let code = args.join(" ");
            if (code.startsWith("```bat\n") && code.endsWith("\n```")) {
                code = code.slice(6, -3);
            }
            child_process.exec(code, [], (error, stdout, stderr) => {
                if (error) return handlers.errorHandler.regularError(error, message);
                else {
                    let result = utils.secretUtils.secretUtilTwo(stdout);
                    let characterLimit = 1991;
                    if (result.length > characterLimit) {
                        let multiples = Math.floor(result.length / characterLimit);
                        let remainder = result.length % characterLimit;
                        let evalPages = [];
                        for (i=0;i<multiples*characterLimit;i+=characterLimit) {
                            evalPages.push(`\`\`\`\n${result.slice(i, i+characterLimit)}\n\`\`\``);
                        }
                        if (remainder) {
                            evalPages.push(`\`\`\`\n${result.slice(-remainder, result.length)}\n\`\`\``);
                        }
                        message.channel.send("Result too large, creating paginator...").then(m => new utils.paginator.Paginator(message, m, evalPages[0], evalPages));
                    } else message.channel.send("```\n" + result + "\n```");
                }
            });
        }
    }
}
