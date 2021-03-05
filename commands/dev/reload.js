const fs = require("fs");
const { owner } = require("../../config");

module.exports = {
    name: "reload",
    description: "Reload all my commands.",
    execute(message) {
        if (message.author.id == owner.id) {
            message.channel.send("Reloading commands...").then(m => {
                const commandFolders = fs.readdirSync("../MrFactual/commands"); // file paths are so weird
                for (const folder of commandFolders) {
                    const commandFiles = fs.readdirSync(`../MrFactual/commands/${folder}/`).filter(file => file.endsWith(".js"));
                    for (const file of commandFiles) {
                        delete require.cache[require.resolve(`../${folder}/${file}`)];
                        const newCommand = require(`../${folder}/${file}`);
	                message.client.commands.set(newCommand.name, newCommand);
                    }
                }
                m.edit("Commands reloaded!");
            });
        }
    }
}
