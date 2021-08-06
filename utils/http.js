const fetch = require("node-fetch");

module.exports.makeGetRequest = async (url, github_api_token) => {
    const res = await fetch(url, {
        headers: github_api_token ? {
            "Authorization": `token ${github_api_token}`
        } : {}
    });
    let data;
    try {
        data = await res.json();
    } catch {
        return res;
    }
    return data;
}