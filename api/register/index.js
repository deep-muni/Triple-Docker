const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./arch/route/register');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/*', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send("Register");
});

app.use('/register', router);

app.listen(3002, function () {
    console.log("Register Port: 3002");
});
