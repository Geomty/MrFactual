const fetch = require("node-fetch");
const utils = require("../utils/utils")
const { github_api_url } = require("../config");

module.exports = {
    name: "github",
    description: "View stats about my GitHub repository.",
    execute(message) {
        message.channel.send("Fetching info...").then(async m => {
            const path = "/repos/Geomty/MrFactual";
            const githubRes = await fetch(`${github_api_url}${path}`);
            const githubData = await githubRes.json();
            if (githubData.message && githubData.message.includes("API rate limit exceeded")) {
                return message.channel.send("Uh oh, I've been rate limited from GitHub's API. Try again in a few minutes.");
            }
            const contributorRes = await fetch(`${github_api_url}${path}/contributors`);
            const contributorData = await contributorRes.json();
            let contributorArray = [];
            for (const contributor in contributorData) {
                contributorArray.push(`${contributorData[contributor].login} (${contributorData[contributor].contributions} contributions)`);
            }
            let contributorMessage = contributorArray.join(", ");
            const languageRes = await fetch(`${github_api_url}${path}/languages`);
            const languageData = await languageRes.json();
            let languageArray = [];
            for (const language in languageData) {
                languageArray.push(`${language} (${languageData[language]} bytes of code)`);
            }
            let languageMessage = languageArray.join(", ");
            const branchRes = await fetch(`${github_api_url}${path}/branches`);
            const branchData = await branchRes.json();
            let branchMessage = 0;
            for (const branch in branchData) {
                branchMessage++;
            }
            const contentRes = await fetch(`${github_api_url}${path}/contents`);
            const contentData = await contentRes.json();
            let contentMessage = 0;
            for (const content in contentData) {
                contentMessage++;
            }
            const issueRes = await fetch(`${github_api_url}${path}/issues`);
            const issueData = await issueRes.json();
            let issueMessage = 0;
            for (const issue in issueData) {
                issueMessage++;
            }
            const pullRes = await fetch(`${github_api_url}${path}/pulls`);
            const pullData = await pullRes.json();
            let pullMessage = 0;
            for (const pull in pullData) {
                pullMessage++;
            }
            const commitRes = await fetch(`${github_api_url}${path}/commits`);
            const commitData = await commitRes.json();
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
