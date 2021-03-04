const { MongoClient } = require("mongodb");
const chalk = require("chalk");
const { database_url } = require("../config");

let client;
module.exports.databaseInit = async () => {
    client = new MongoClient(database_url, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db("MrFactual");
    const collection = db.collection("tests");
    const result = await collection.findOne({ isMongoReady: "MongoDB is ready to go!" });
    console.log(chalk.magentaBright(result.isMongoReady));
}

module.exports.findDocument = async (collection, document) => {
    const db = client.db("MrFactual");
    const dbCollection = db.collection(collection);
    const result = await dbCollection.findOne(document);
    return result;
}

module.exports.createDocument = async (collection, document) => {
    const db = client.db("MrFactual");
    const dbCollection = db.collection(collection);
    const result = await dbCollection.insertOne(document);
    return result;
}

module.exports.deleteDocument = async (collection, document) => {
    const db = client.db("MrFactual");
    const dbCollection = db.collection(collection);
    const result = await dbCollection.deleteOne(document);
    return result;
}

module.exports.changeDocument = async (collection, document, whatToChange) => {
    const db = client.db("MrFactual");
    const dbCollection = db.collection(collection);
    const result = await dbCollection.updateOne(document, whatToChange);
    return result;
}