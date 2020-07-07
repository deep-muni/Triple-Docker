const con = require('../db/connection');
const bcrypt = require('bcrypt');

const loginUser = (req, res) => {

    const query = "SELECT email, pass from users WHERE email " + "= '" + req.body.email + "'";

    con.query(query, async function (err, result) {
        if(err){
            console.log(err);
            res.json({status: false, message: 'Issue'});
        }else{
            if(result.length === 1){

                const match = await bcrypt.compare(req.body.password, result[0].pass);

                if(match){

                    const query = "UPDATE users SET user_status = 1 WHERE email " + "= '" + req.body.email+ "'";
                    con.query(query, function (err) {
                        if(err){
                            console.log(err);
                            res.json({status: false, message: 'Issue'});
                        }
                    });

                    res.json({status: true, message: 'Success'});
                }else{
                    res.json({status: false, message: 'Please enter correct credentials'});
                }

            }else{
                res.json({status: false, message: 'Please enter correct credentials'});
            }
        }
    });
}

module.exports.loginUser = loginUser;
