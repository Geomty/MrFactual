const FactCommand = require("../classes/basefact");
const { selectRandomApi } = require("../../../utils/http");

module.exports = new FactCommand("dog", (data, apis) => {
    switch (data.num) {
        case "first":
            return data.res[apis[data.num].property][0];
        case "second":
            return data.res[0][apis[data.num].property];
        case "third":
            return data.res[apis[data.num].property];
    }
}, async (data, apis) => {
    let image = data.res[apis[data.num].property];
    while (image.endsWith(".mp4")) { // one of the dog image apis sends VIDEOS
        let dataTwo = await selectRandomApi(apis);
        image = dataTwo.res[apis[dataTwo.num].property];
    }
    return image;
});