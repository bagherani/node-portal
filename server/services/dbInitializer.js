var MongoClient = require('mongodb').MongoClient;
var config = require('../config');

MongoClient.connect(config.mongodbUrl, function (err, db) {
    if (err) throw err;

    var promises = [];

    var dbo = db.db(config.dbName);
    promises.push(new Promise((resolver, reject) => {
        dbo.createCollection("users", function (err, res) {
            if (err) throw err;
            resolver();
        });
    }));

    promises.push(new Promise((resolver, reject) => {
        dbo.createCollection("products", function (err, res) {
            if (err) throw err;
            resolver();
        });
    }));

    Promise.all(promises).then(() => {
        db.close();
    })
});

module.exports = null;