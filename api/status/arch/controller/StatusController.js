const con = require('../db/connection')

const getStatus = (req, res) => {
    const query = "SELECT email from users WHERE user_status " + "= 1";

    con.query(query, function (err, result) {
        if(err){
            console.log(err);
            res.json({status: false, message: 'Issue'});
        }else{
            res.send(result);
        }
    });
}

module.exports.getStatus = getStatus;
