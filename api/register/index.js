const express = require('express');
const sql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

const con = sql.createConnection({
    host: "localhost", user: "root", password: "admin123", database: "tripleDocker"
});

con.connect(function(err) {
    if(err){
        throw err;
    }else{
        console.log("Database connection successful");
    }
});

app.get('/', function (req, res) {
    res.send("Register");
});

app.listen(3002, function () {
    console.log("Register Port: 3002");
});
