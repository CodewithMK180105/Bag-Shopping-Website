const userModels = require('../models/user.models');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {generateToken}= require('../utils/generateToken')


module.exports.registerUser= async (req, res)=>{
    try{
        let {email, password, fullname}=req.body;

        let user=await userModels.findOne({email: email});

        if(user){
            req.flash("Error", "You already have an account please login");
            return res.redirect("/");
        }

        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(password, salt, async (err, hash)=>{
                if(err) return res.send(err.message);
                else{
                    let user=await userModels.create({
                        email,
                        password: hash,
                        fullname,
                    })
                    let token=generateToken(user);
                    res.cookie("token", token);
                    return res.redirect("/shop");
                }
            })
        });

    } catch(err){
        res.send(err.message);
    }
}

module.exports.loginUser= async(req, res)=>{
    let {email, password}=req.body;

    let user=await userModels.findOne({email: email});

    if(!user){
        req.flash("Error", "Email or Password is Incorrect");
        return res.redirect("/");
    }

    bcrypt.compare(password, user.password, (err, result)=>{
        if(result){
            let token=generateToken(user);
            res.cookie("token", token);
            return res.redirect("/shop");
        } else{
            res.status(404).send("Email or password Incorrect");
        }
    })
}

module.exports.logout= async(req,res)=>{
    res.cookie("token", "");
    res.redirect("/");
}