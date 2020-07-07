const sql = require('mysql');

const con = sql.createConnection({
    // host: "localhost", user: "root", password: "admin123", database: "tripleDocker"
    host: "tripledocker-db.mysql.database.azure.com", user: "adminRoot@tripledocker-db",
    password: "Admin123", database: "tripledocker", port: 3306,
});

con.connect(function(err) {
    if(err){
        throw err;
    }else{
        console.log("Database connection successful");
    }
});

module.exports = con;
