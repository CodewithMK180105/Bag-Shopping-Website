const userModels = require('../models/user.models');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {generateToken}= require('../utils/generateToken')


module.exports.registerUser= async (req, res)=>{
    try{
        let {email, password, fullname}=req.body;

        let user=await userModels.findOne({email: email});

        if(user) return res.status(401).send("You already have an account, Please Login!");

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
                    res.send("user created now successfully");

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

    if(!user) return res.status(404).send("Email or password Incorrect");

    bcrypt.compare(password, user.password, (err, result)=>{
        if(result){
            let token=generateToken(user);
            res.cookie("token", token);
            res.send("You can Login.");
        } else{
            res.status(404).send("Email or password Incorrect");
        }
    })
}