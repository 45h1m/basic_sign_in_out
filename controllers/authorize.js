const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){

    if(!req.cookies.token) return res.status(401).json({
        error: "Sign in first - Missing token",
    });

    jwt.verify(
        req.cookies.token, 
        process.env.JWT_SECRET,
        (err, authData) => {

            if(err) {

                res.cookie('token', '', { expires: new Date(0) });

                return res.status(401).json({
                    error: "Invalid token",
                    message: "Invalid token"
                });
            }
            
            req.authData = authData;
            next();
        }
    );
}