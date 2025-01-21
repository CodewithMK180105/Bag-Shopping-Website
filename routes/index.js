const express=require("express");
const router=express.Router();
const bcrypt=require('bcrypt');

router.get("/", (req,res)=>{
    const error="";
    res.render("index", {error});
});

module.exports= router;