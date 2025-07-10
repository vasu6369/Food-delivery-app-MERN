const express=require("express");
const { getreviewsbyid,addReview } = require("../controllers/reviewcontroller");

const reviewrouter=express.Router();

reviewrouter.post("/get",getreviewsbyid);
reviewrouter.post("/add",addReview);


module.exports=reviewrouter;