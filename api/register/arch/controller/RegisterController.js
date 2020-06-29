const con = require('../db/connection')

const registerUser = (req, res) => {
    const query = "SELECT * from users WHERE email " + "= '" + req.body.email+ "'";

    con.query(query, function (err, result) {
        if(err){
            console.log(err);
            res.json({status: false, message: 'Issue'});
        }else{
            if(result.length === 1){
                res.json({status: false, message: 'User already exist'});
            }else{
                const query = "INSERT INTO users(email, user_name, pass)" +
                    " VALUES" + "('"+ req.body.email + "', '" + req.body.name + "', '" + req.body.password + "')";

                con.query(query, function (err) {
                    if (err) {
                        console.log(err);
                        res.json({status: false, message: 'Issue'});
                    } else {
                        res.json({status: true, message: 'User added'});
                    }
                });
            }
        }
    });
}

module.exports.registerUser = registerUser;
