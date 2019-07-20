const client = require('mongodb').MongoClient;

// Yup, this key is here on purpose. Be respectful, but all read and write access to KnownDB is public :D
const MONGO_DB_KEY = 'asdfhuhlihuh^&^8asf86768AS&^13789ASDFfajasoi';

async function CreateConnection() {
    return await client.connect(`mongodb://dbo:${MONGO_DB_KEY}@ds058739.mlab.com:58739/farseekdb`, {useNewUrlParser: true});
}

async function AddNew(name, path) {
    let connection = await CreateConnection();
    let dbo = connection.db('farseekdb');

    return await dbo.collection('known-paths').insertOne({name, path});
}

async function GetPaths() {
    let connection = await CreateConnection();
    let dbo = connection.db('farseekdb');

    return await dbo.collection('known-paths').find({}).toArray();
}

async function Remove(name) {
    let connection = await CreateConnection();
    let dbo = connection.db('farseekdb');

    return await dbo.collection('known-paths').deleteOne({name});
}

function GetPathsSync(callback) {
    (async () => callback(await GetPaths()))();
}

module.exports = { AddNew, GetPaths, Remove, GetPathsSync }