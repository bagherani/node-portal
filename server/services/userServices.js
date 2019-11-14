var db = require('./dbProvider');

class UserServices {
    getUserInfo(req, response) {
        // todo: get userinfo from db using req.decoded
        db.collection("users").then(collection => {
            var users = [];

            collection.insertOne({ username: "mohammad - test" }, (er, inserted) => {
                collection.find().toArray((e, a) => {
                    users = a;
                    db.close();

                    response.json({
                        success: true,
                        message: 'get user info success',
                        data: req.decoded,
                        users: users
                    });

                });
            });
        })
    }
}

module.exports = new UserServices();