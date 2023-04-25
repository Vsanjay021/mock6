const jwt=require("jsonwebtoken");
require("dotenv").config();
async function authentication(req,res,next){
    let token=req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).send({"msg":"You are not authorized token is missing"})
    }
    try {
        let decoded=jwt.verify(token,process.env.SECRET);
        req.user=decoded.userId;
        next();
    } catch (error) {
        return res.status(401).send({"msg":"Invalid token"})
    }
}
module.exports = {
    authentication
};
