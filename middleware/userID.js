
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const getUserID = async function (req){
    const token = req.cookies.jwt;

    try {
        const decodedToken = jwt.verify(token, secret);
        const tokenUserId = decodedToken.id;
        
        return tokenUserId;
    } catch (err) {
       // console.log(err.message);
        return [];
    }
}

module.exports = {
    getUserID
}
