const con = require('../db/connection')

const loginUser = (req, res) => {
    const query = "SELECT * from users WHERE email " + "= '" + req.body.email+ "' AND pass " + "= '" + req.body.password + "'";

    con.query(query, function (err, result) {
        if(err){
            console.log(err);
            res.json({status: false, message: 'Issue'});
        }else{
            if(result.length === 1){
                const query = "UPDATE users SET user_status = 1 WHERE email " + "= '" + req.body.email+ "'";
                con.query(query, function (err) {
                   if(err){
                       console.log(err);
                       res.json({status: false, message: 'Issue'});
                   }
                });
                res.json({status: true, message: 'Success'})
            }else{
                res.json({status: false, message: 'Please enter correct credentials'})
            }
        }
    });
}

module.exports.loginUser = loginUser;
