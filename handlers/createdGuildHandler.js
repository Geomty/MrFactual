module.exports = createdGuild => {
    const channels = createdGuild.channels.cache.filter(ch => ch.type == "text").filter(ch => ch.name.includes("general") || ch.name.includes("chat") || ch.name.includes("bot")).array();
    channels[0].send("Hey, thanks for adding me here! My developer and I really appreciate it! My default prefix is `f.` and a list of my commands can be found with `f.help`.");
}