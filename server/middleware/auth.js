const jwt=require('jsonwebtoken');
const usermodel=require("../models/usermodel");
const bcrypt=require("bcrypt");

const JWT_SECRET=process.env.JWT_SECRET;


const signup=async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const exist=await usermodel.findOne({email});
        if(exist){
            return res.status(400).json({success:false,msg:"User Already Exist"});
        }
        const hashpass=await bcrypt.hash(password,10);
        await usermodel.insertMany({name,email,password:hashpass});
        res.json({success:true,msg:"Sign Success"});
    }
    catch(err){
        console.log(err);
        res.json({success:false,msg:"server Errer"});
    }
}


const login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await usermodel.findOne({email});
        console.log(user);
        if(!user){
           return res.json({success:false,msg:"User Not Exist"});
        }
        const passmatch=await bcrypt.compare(password,user.password);
        if(!passmatch){
            return res.json({success:false,msg:"Incorrect Password"});
        }

        const token=jwt.sign({_id:user._id,email:user.email},JWT_SECRET,{expiresIn:'1h'});
        res.json({success:true,token:token,user:user});
    }
    catch(err){
        console.log(err);
    }
}


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, msg: "Access denied. No token provided." });
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, msg: "Invalid or expired token." });
        }
        req.user = user;
        next();
    });
};

const googlelogin=async(req,res)=>{
    const {name,email,picture}=req.body;
    try{
        let user=await usermodel.findOne({email});
        if(!user){
            const newuser=await usermodel.insertMany({name,email,picture});
            res.json({success:true,user:newuser[0]});
        }
        const token=jwt.sign({_id:user._id,email:user.email},JWT_SECRET,{expiresIn:'1h'});
        res.json({success:true,token:token,user:user});
    }
    catch(err){
        console.log(err);
    }
}


module.exports={signup,login,authenticateToken,googlelogin};