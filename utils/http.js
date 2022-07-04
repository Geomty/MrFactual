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

module.exports.selectRandomApi = async apis => {
    let apiArray = [];
    for (const api in apis) {
        apiArray.push(api);
    }
    let num = Math.floor(Math.random()*apiArray.length);
    let res = await module.exports.makeGetRequest(apis[apiArray[num]].url);
    return { res: res, num: apiArray[num] };
}