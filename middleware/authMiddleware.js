const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = res.headers.authorization;

    if(!authHeader) return res.status(403).json({message: "No token provide"});
    const token  = authHeader.split("")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) 
            return res.status(401).json({message: "Inavalid Token Please"});
        req.user = user; 
        next();
        }
    )
}
module.exports = verifyToken