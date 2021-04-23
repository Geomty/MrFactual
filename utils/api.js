const http = require("./http");

module.exports.selectRandomApi = async apis => {
    let apiArray = [];
    for (const api in apis) {
        apiArray.push(api);
    }
    let num = Math.floor(Math.random()*apiArray.length);
    let res = await http.makeGetRequest(apis[apiArray[num]].url);
    return { res: res, num: apiArray[num] };
}
