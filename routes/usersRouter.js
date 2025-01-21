const express= require('express');
const router=express.Router();
const {registerUser, loginUser}= require('../controllers/auth.controller');

router.get("/", (req, res)=>{
    res.send("hey it's working");
})

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports= router;