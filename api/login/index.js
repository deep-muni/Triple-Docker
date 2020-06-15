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
    res.send("Login");
});

app.listen(3001, function () {
    console.log("Login Port: 3001");
});
