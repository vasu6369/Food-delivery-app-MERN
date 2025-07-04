const express=require("express");
const {togglewishlist} = require("../controllers/wishlistcontroller");

const wishrouter=express.Router();

wishrouter.post("/togglewish",togglewishlist);


module.exports=wishrouter;