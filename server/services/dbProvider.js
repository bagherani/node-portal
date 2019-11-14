var MongoClient = require('mongodb').MongoClient;
var config = require('../config');
var dbProvider = {
    collection: (collectionName) => {
        return new Promise((resolve, reject) => {
            MongoClient.connect(config.mongodbUrl, function (err, db) {
                if (err)
                    reject(err);

                dbProvider.db = db;
                var dbo = db.db(config.dbName);

                dbo.collection(collectionName, function (err, res) {
                    if (err)
                        reject(err);

                    resolve(res);
                });
            });
        })
    },
    close: () => {
        if (dbProvider.db)
            dbProvider.db.close();
    }
};


module.exports = dbProvider;