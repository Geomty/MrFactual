const utils = require("../../utils/utils")
const { github_api } = require("../../config").api_urls;

module.exports = {
    name: "github",
    description: "View stats about my GitHub repository.",
    execute(message) {
        message.channel.send("Fetching info...").then(async m => {
            const path = "/repos/Geomty/MrFactual";
            const githubData = await utils.http.makeGetRequest(github_api + path);
            if (githubData.message && githubData.message.includes("API rate limit exceeded")) {
                return message.channel.send("Uh oh, I've been rate limited from GitHub's API. Try again in a few minutes.");
            }
            const contributorData = await utils.http.makeGetRequest(github_api + path + "/contributors");
            let contributorArray = [];
            for (const contributor of contributorData) {
                contributorArray.push(`${contributor.login} (${contributor.contributions} contributions)`);
            }
            let contributorMessage = contributorArray.join(", ");
            const languageData = await utils.http.makeGetRequest(github_api + path + "/languages");
            let languageArray = [];
            for (const language in languageData) {
                languageArray.push(`${language} (${languageData[language]} bytes of code)`);
            }
            let languageMessage = languageArray.join(", ");
            const branchData = await utils.http.makeGetRequest(github_api + path + "/branches");
            let branchMessage = 0;
            for (const branch of branchData) {
                branchMessage++;
            }
            const contentData = await utils.http.makeGetRequest(github_api + path + "/contents");
            let contentMessage = 0;
            for (const content of contentData) {
                contentMessage++;
            }
            const issueData = await utils.http.makeGetRequest(github_api + path + "/issues");
            let issueMessage = 0;
            for (const issue of issueData) {
                issueMessage++;
            }
            const pullData = await utils.http.makeGetRequest(github_api + path + "/pulls");
            let pullMessage = 0;
            for (const pull of pullData) {
                pullMessage++;
            }
            const commitData = await utils.http.makeGetRequest(github_api + path + "/commits");
            let commitMessage = `"${commitData[0].commit.message}" by ${commitData[0].commit.author.name} on ${new Date(commitData[0].commit.author.date)}`;

            const githubEmbed = new utils.embeds.MrFactualEmbed()
            .setTitle("Free information about my GitHub repository!")
            .setDescription("Woohoo!")
            .addFields(
                { name: "Link:", value: githubData.svn_url },
                { name: "Name:", value: githubData.name },
                { name: "Description:", value: githubData.description },
                { name: "Owner:", value: githubData.owner.login },
                { name: "Contributors:", value: contributorMessage },
                { name: "Language(s):", value: languageMessage },
                { name: "Created on:", value: new Date(githubData.created_at) },
                { name: "Last updated on:", value: new Date(githubData.updated_at) },
                { name: "Default branch:", value: githubData.default_branch },
                { name: "Number of branches:", value: branchMessage },
                { name: "Number of files in main directory:", value: contentMessage },
                { name: "Number of watchers:", value: githubData.watchers },
                { name: "Number of issues:", value: issueMessage },
                { name: "Number of pulls:", value: pullMessage },
                { name: "Most recent commit:", value: commitMessage },
                { name: "License:", value: githubData.license.name }
            )
            m.edit(githubEmbed);
            m.edit("");
        });
    }
}
