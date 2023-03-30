const jwt = require("jsonwebtoken");

function verify (req, res, next){
    const authheader = req.headers.token;

    if(authheader){
         const token = authheader.split(' ')[1];

         jwt.verify(token, process.env.secret_pass_key, (err, user) => {
            if(err){
                res.status(403).json(" Token is not valid");
            }

            req.user = user;
            // console.log(req);
            console.log('user', user);
            next();

         })
    }
    else {
        return res.status(401).json(" You are not authenicated");
    }
}

module.exports = verify;