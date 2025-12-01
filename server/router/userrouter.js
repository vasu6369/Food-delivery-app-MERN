const express=require("express");
const {changeorders,getdetails,updateuser,changepassword,getusers,deleteuser, getorders, changestatus} =require("../controllers/usecontroller");
// login,signup,googlelogin,

const userrouter=express.Router();

// userrouter.post("/signup",signup);
// userrouter.post("/login",login);
// userrouter.post("/googlelogin",googlelogin);
userrouter.post("/changeorder",changeorders);
userrouter.post("/getdetails",getdetails);
userrouter.post("/updateuser",updateuser);
userrouter.get("/getusers",getusers);
userrouter.post("/changepassword",changepassword);
userrouter.delete("/deleteuser/:_id",deleteuser);
userrouter.post("/getorders",getorders);
userrouter.put("/:id/changestatus",changestatus);



module.exports=userrouter;