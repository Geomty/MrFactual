const { woohoo } = require("../../assets/constants");
const { url, token } = require("../../config").api_urls.github_api;

module.exports = {
    name: "github",
    description: "View stats about my GitHub repository.",
    async execute(message) {
        message.channel.sendTyping();
        const path = "/repos/Geomty/MrFactual";
        const githubData = await message.client.utils.http.makeGetRequest(url + path, token);
        if (githubData.message && githubData.message.includes("API rate limit exceeded")) {
            return message.channel.send("Uh oh, I've been rate limited from GitHub's API. Try again in a few minutes.");
        }
        const contributorData = await message.client.utils.http.makeGetRequest(url + path + "/contributors", token);
        let contributorArray = [];
        for (const contributor of contributorData) {
            contributorArray.push(`${contributor.login} (${contributor.contributions} contributions)`);
        }
        let contributorMessage = contributorArray.join(", ");
        const languageData = await message.client.utils.http.makeGetRequest(url + path + "/languages", token);
        let languageArray = [];
        for (const language in languageData) {
            languageArray.push(`${language} (${languageData[language]} bytes of code)`);
        }
        let languageMessage = languageArray.join(", ");
        const branchData = await message.client.utils.http.makeGetRequest(url + path + "/branches", token);
        let branchMessage = 0;
        for (const {} of branchData) {
            branchMessage++;
        }
        const contentData = await message.client.utils.http.makeGetRequest(url + path + "/contents", token);
        let contentMessage = 0;
        for (const {} of contentData) {
            contentMessage++;
        }
        const issueData = await message.client.utils.http.makeGetRequest(url + path + "/issues", token);
        let issueMessage = 0;
        for (const {} of issueData) {
            issueMessage++;
        }
        const pullData = await message.client.utils.http.makeGetRequest(url + path + "/pulls", token);
        let pullMessage = 0;
        for (const {} of pullData) {
            pullMessage++;
        }
        const commitData = await message.client.utils.http.makeGetRequest(url + path + "/commits");
        let commitMessage = `"${commitData[0].commit.message}" by ${commitData[0].commit.author.name} on ${new Date(commitData[0].commit.author.date)}`;

        const githubEmbed = new message.client.utils.embeds.MrFactualEmbed()
        .setTitle("Free information about my GitHub repository!")
        .setDescription(woohoo)
        .addFields(
            { name: "Link:", value: githubData.html_url },
            { name: "Name:", value: githubData.name },
            { name: "Description:", value: githubData.description },
            { name: "Owner:", value: githubData.owner.login },
            { name: "Contributors:", value: contributorMessage },
            { name: "Language(s):", value: languageMessage },
            { name: "Created on:", value: new Date(githubData.created_at).toString() },
            { name: "Last updated on:", value: new Date(githubData.updated_at).toString() },
            { name: "Default branch:", value: githubData.default_branch },
            { name: "Number of branches:", value: branchMessage.toString() },
            { name: "Number of files in main directory:", value: contentMessage.toString() },
            { name: "Number of watchers:", value: githubData.watchers.toString() },
            { name: "Number of issues:", value: issueMessage.toString() },
            { name: "Number of pulls:", value: pullMessage.toString() },
            { name: "Most recent commit:", value: commitMessage },
            { name: "License:", value: githubData.license.name }
        )
        message.channel.send({ embeds: [githubEmbed] });
    }
}
