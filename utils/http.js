const fetch = require("node-fetch");

module.exports.makeGetRequest = async link => {
    const res = await fetch(link);
    const data = await res.json();
    return data;
}