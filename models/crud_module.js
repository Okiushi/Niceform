require('dotenv').config({ path: '../.env'}); // Import des variables d'environnement

const { MongoClient } = require('mongodb');
const uri = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const client = new MongoClient(uri);

async function create(collection, data) {
    const db = client.db();
    return await db.collection(collection).insertOne(data);
}

async function read(collection, query) {
    const db = client.db();
    return await db.collection(collection).find(query).toArray();
}

async function update(collection, query, newdata) {
    const db = client.db();
    return await db.collection(collection).updateOne(query, { $set: newdata });
}

async function remove(collection, query) {
    const db = client.db();
    return await db.collection(collection).deleteOne(query);
}

module.exports = { create, read, update, remove };
