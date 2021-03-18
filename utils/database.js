const { MongoClient } = require("mongodb");
const chalk = require("chalk");
const { database_url } = require("../config");

let client;
class Database {
    constructor() {
        client = new MongoClient(database_url, { useUnifiedTopology: true });
        client.connect().then(() => {
            const db = client.db("MrFactual");
            const collection = db.collection("tests");
            collection.findOne({ isMongoReady: "MongoDB is ready to go!" }).then(result => {
                console.log(chalk.magentaBright(result.isMongoReady));
            });
        });
        this.client = client;
    }
    static async findDocument(collectionQuery, documentQuery) {
        const db = client.db("MrFactual");
        const collection = db.collection(collectionQuery);
        const result = await collection.findOne(documentQuery);
        return result;
    }
    static async createDocument(collectionQuery, documentQuery) {
        const db = client.db("MrFactual");
        const collection = db.collection(collectionQuery);
        const result = await collection.insertOne(documentQuery);
        return result;
    }
    static async deleteDocument(collectionQuery, documentQuery) {
        const db = client.db("MrFactual");
        const collection = db.collection(collectionQuery);
        const result = await collection.deleteOne(documentQuery);
        return result;
    }
    static async changeDocument(collectionQuery, documentQuery, whatToChange) {
        const db = client.db("MrFactual");
        const collection = db.collection(collectionQuery);
        const result = await collection.updateOne(documentQuery, whatToChange);
        return result;
    }
}

module.exports = { Database };