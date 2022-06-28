const jwt = require('jsonwebtoken');
const JWT_SECTET = 'secret';



const fetchuser = (req, res, next)=>{
    //get the user form the jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenciate using a vlaid token"});
    }
    try {

        const data = jwt.verify(token, JWT_SECTET);
        req.id =data.id;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenciate using a vlaid token" });
    }
}

module.exports = fetchuser;