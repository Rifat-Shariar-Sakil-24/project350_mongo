const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const isAuthenticated = function(req,res,next){
    const token = req.cookies.jwt;
    

    //check jwt token is there?
    if(token){
        jwt.verify(token, secret, function(err, decodedToken){
            if(err){
                console.log(err.message);
                res.redirect('/');
            }
            else{
               // console.log(decodedToken.id);
                next();
            }
        })

    }
    else{
         res.redirect('/');
    }
}

module.exports = {
    isAuthenticated
}


const isLoggedIn = function(req,res,next){
    const token = req.cookies.jwt;
    console.log(token);
    if(token){
        jwt.verify(token, secret, function(err, decodedToken){
            if(err){
                //console.log(err.message);
                //res.redirect('/');
                next();
            }
            else{
               // console.log(decodedToken.id);
                //next();
                res.redirect('/menu');
            }
        })

    }
    else{
         next();
    }
}

module.exports = {
    isAuthenticated,
    isLoggedIn
}