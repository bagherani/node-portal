const express = require('express');
const bodyParser = require('body-parser');
let middleware = require('./middleware');
var cookieParser = require('cookie-parser');

// import services
require('./services/dbInitializer');
const authServices = require('./services/authServices');
const userServices = require('./services/userServices');

// Starting point of the server
function main() {
    let app = express();
    const port = process.env.PORT || 8000;

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser())
    app.use(bodyParser.json());

    // Routes
    app.post('/user/login', authServices.login);
    app.get('/user/getUserInfo', middleware.checkToken, userServices.getUserInfo);

    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

main();