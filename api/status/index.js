const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./arch/route/status');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send("Status");
});

app.use('/status', router);

app.listen(3003, function () {
    console.log("Status Port: 3003");
});
