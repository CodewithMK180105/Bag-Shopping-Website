const jwt=require('jsonwebtoken');
const userModels=require('../models/user.models');

module.exports= async (req, res, next)=>{
    if(!req.cookies.token){
        req.flash("error", "You need to be logged in first");
        return res.redirect('/');
    }

    try{
        let decoded=jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user=await userModels.findOne({email: decoded.email}).select("-password"); // Give us data present in the token including password, so we remove password.
        req.user= user;
        next();
    } catch(err){
        req.flash("error", "Something went wrong");
        return res.redirect('/');
    }
}