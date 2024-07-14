// not updated for slash commands
const { owner } = require("../../config").people;

module.exports = {
    name: "logoff",
    description: "Shut me down.",
    async execute(message) {
        if (message.author.id == owner.id) {
            await message.channel.send(":wave: See you soon!");
            process.exit();
        }
    }
}