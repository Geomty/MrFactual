const fetch = require("node-fetch");

module.exports.makeGetRequest = async url => {
    const res = await fetch(url);
    let data;
    try {
        data = await res.json();
    } catch {
        return res;
    }
    return data;
}