const express=require("express");
const router=express.Router();
const isloggedIn=require("../middlewares/isLoggedIn");
const productModels = require("../models/product.models");

router.get("/", (req,res)=>{
    const error=req.flash("error");
    res.render("index", {error});
});

router.get("/shop", isloggedIn, async (req, res)=>{
    let products=await productModels.find();
    res.render("shop",{products});
})

module.exports= router;