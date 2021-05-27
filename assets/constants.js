module.exports = {
    profilePicture: "https://raw.githubusercontent.com/Geomty/MrFactual/main/assets/MrFactualLogo.jpg",
    prefix: (process.env.BETA == "true") ? "f.." : "f.",

    batCharacterLimit: 1991,
    jsCharacterLimit: 1992,
    evalPaginatorLoading: "Result too large, creating paginator...",

    factLoading: "Retrieving a fact...",
    factEmbedTitle: "Did you know...",

    defaultLoading: "Please wait...",
    infoLoading: "Fetching info...",
    day: 1000*60*60*24,
    hour: 1000*60*60,
    minute: 1000*60,
    commandCategoryOrder: ["main", "fact", "management"],
    woohoo: "Woohoo!",

    dbName: "MrFactual",
    embedFooter: "Thanks for using me!",
    reallyLeftArrow: "⏪",
    leftArrow: "⬅",
    rightArrow: "➡",
    reallyRightArrow: "⏩",
    stopButton: "⏹",
    paginatorClose: "This menu has successfully been closed."
}