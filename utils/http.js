const fetch = require("node-fetch");

module.exports.makeGetRequest = async url => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}