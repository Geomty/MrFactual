const fs = require("fs");
const { ownerID } = require("../config");

module.exports = {
    name: "reload",
    description: "Reload all my commands.",
    hidden: true,
    execute(message) {
        if (message.author.id == ownerID) {
            message.channel.send("Reloading commands...").then(m => {
                const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));
                for (const file of commandFiles) {
                    delete require.cache[require.resolve(`./${file}`)];
                    const newCommand = require(`./${file}`);
	            message.client.commands.set(newCommand.name, newCommand);
                }
                m.edit("Commands reloaded!");
            });
        }
    }
}
