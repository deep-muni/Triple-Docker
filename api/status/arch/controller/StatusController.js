const con = require('../db/connection')

const getStatus = (req, res) => {
    const query = "SELECT user_name, email from users WHERE user_status " + "= 1";

    con.query(query, function (err, result) {
        if(err){
            console.log(err);
            res.json({status: false, message: 'Issue'});
        }else{
            res.send(result);
        }
    });
}

const logoutAll = (req, res) => {
    const query = "UPDATE users SET user_status = 0 WHERE user_status = 1";

    con.query(query, function (err, result) {
        if(err){
            console.log(err);
            res.json({status: false, message: 'Issue'});
        }else{
            res.json({status: true, message: 'Success'});
        }
    });
}

module.exports.getStatus = getStatus;
module.exports.logoutAll = logoutAll;
