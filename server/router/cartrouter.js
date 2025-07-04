const express=require("express");
const {addtocart,removefromcart,deleteitemfromcart}=require("../controllers/cartcontroller");

const cartrouter=express.Router();

cartrouter.post("/add",addtocart);
cartrouter.post("/remove",removefromcart);
cartrouter.post("/deleteitem",deleteitemfromcart);

module.exports=cartrouter;  