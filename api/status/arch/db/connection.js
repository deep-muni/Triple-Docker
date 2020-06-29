const sql = require('mysql');

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

module.exports = con;
