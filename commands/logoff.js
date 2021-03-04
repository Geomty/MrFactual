const { owner } = require("../config");

module.exports = {
    name: "logoff",
    description: "Shut me down.",
    hidden: true,
    async execute(message) {
        if (message.author.id == owner.id) {
            await message.channel.send(":wave: See you soon!");
            process.exit();
        }
    }
}