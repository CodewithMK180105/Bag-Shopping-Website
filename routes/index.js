const express=require("express");
const router=express.Router();
const isloggedIn=require("../middlewares/isLoggedIn");
const productModels = require("../models/product.models");
const userModels = require("../models/user.models");

router.get("/", (req,res)=>{
    const error=req.flash("error");
    res.render("index", {error, loggedin: false});
});

router.get("/shop", isloggedIn, async (req, res)=>{
    let products=await productModels.find();
    let success=req.flash("success");
    res.render("shop",{products, success});
})
router.get("/cart", isloggedIn, async (req, res)=>{
    let user=await userModels.findOne({email: req.user.email}).populate("cart");
    res.render("cart",{user});
})
router.get("/profile", isloggedIn, async (req, res)=>{
    let user=await userModels.findOne({email: req.user.email});
    res.render("profile",{user});
})
router.get("/addtocart/:productid", isloggedIn, async (req, res)=>{
    let user= await userModels.findOne({email: req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to cart");
    res.redirect('/shop');
})

module.exports= router;