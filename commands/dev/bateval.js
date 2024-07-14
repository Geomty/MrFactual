// not updated for slash commands
const child_process = require("child_process");
const { batCharacterLimit } = require("../../assets/constants");
const { owner } = require("../../config").people;

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
                if (error) return message.client.handlers.errorHandler.regularError(error, message);
                else {
                    let result = message.client.utils.secretUtils.secretUtilTwo(stdout);
                    if (result.length > batCharacterLimit) {
                        let multiples = Math.floor(result.length / batCharacterLimit);
                        let remainder = result.length % batCharacterLimit;
                        let evalPages = [];
                        for (i=0;i<multiples*batCharacterLimit;i+=batCharacterLimit) {
                            evalPages.push(`\`\`\`\n${result.slice(i, i+batCharacterLimit)}\n\`\`\``);
                        }
                        if (remainder) {
                            evalPages.push(`\`\`\`\n${result.slice(-remainder, result.length)}\n\`\`\``);
                        }
                        new message.client.utils.paginator.Paginator(message, evalPages);
                    } else message.channel.send("```\n" + result + "\n```");
                }
            });
        }
    }
}
