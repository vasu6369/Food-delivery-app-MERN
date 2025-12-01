const usermodel=require("../models/usermodel");
const ordermodel=require("../models/ordermodel")
const bcrypt=require("bcrypt");

// const signup=async(req,res)=>{
//     const {name,email,password}=req.body;
//     try{
//         const exist=await usermodel.findOne({email});
//         if(exist){
//             return res.status(400).json({success:false,msg:"User Already Exist"});
//         }
//         const hashpass=await bcrypt.hash(password,10);
//         await usermodel.insertMany({name,email,password:hashpass});
//         res.json({success:true,msg:"Sign Success"});
//     }
//     catch(err){
//         console.log(err);
//         res.json({success:false,msg:"server Errer"});
//     }
// }

// const login=async(req,res)=>{
//     const {email,password}=req.body;
//     try{
//         const user=await usermodel.findOne({email});
//         console.log(user);
//         if(!user){
//            return res.json({success:false,msg:"User Not Exist"});
//         }
//         const passmatch=await bcrypt.compare(password,user.password);
//         if(!passmatch){
//             return res.json({success:false,msg:"Incorrect Password"});
//         }
//         res.json({success:true,user:user});
//     }
//     catch(err){
//         console.log(err);
//     }
// }


// const googlelogin=async(req,res)=>{
//     const {name,email,picture}=req.body;
//     try{
//         const user=await usermodel.findOne({email});
//         if(user){
//            return res.json({success:true,user:user});
//         }
//         const newuser=await usermodel.insertMany({name,email,picture});
//         res.json({success:true,user:newuser[0]});
//     }
//     catch(err){
//         console.log(err);
//     }
// }


const changeorders = async (req, res) => {
    const { address, items, amount, userid } = req.body;
    try {
        const newOrder = await ordermodel.create({userid,items,amount,address,status: "Pending"});
        const updatedUser = await usermodel.findByIdAndUpdate(userid,{$push: { orders: newOrder._id },cart: {},},{ new: true });
        res.json({ success: true, user: updatedUser });
    } catch (err) {
        console.log(err);
        res.json({ success: false, msg: "Something went wrong" });
    }
};

const getdetails=async(req,res)=>{
    const {_id}=req.body;
    try{
        const user=await usermodel.findById(_id);
        res.json({success:true,user:user});
    }
    catch(err){
        console.log(err);
        res.json({success:false,masg:"Error while fetching details"});
    }
}

const getorders = async (req, res) => {
  const { orderIds } = req.body;
  try {
    const orders = await ordermodel.find({ _id: { $in: orderIds } }).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
};

const updateuser=async(req,res)=>{
    const{_id,name,picture}=req.body;
    try{
        const user=await usermodel.findByIdAndUpdate(_id,{name,picture});
        res.json({success:true,user:user});
    }
    catch(err){
        console.log(err);
        res.json({success:false,msg:"Error"})
    }
}

const changepassword=async(req,res)=>{
    const{_id,current,newpass}=req.body;
    try{
        const user=await usermodel.findById(_id);
        const passmatch=await bcrypt.compare(current,user.password);
        if(!passmatch){
            return res.json({success:false,msg:"Incorrect password"});
        }
        const hashedpass=await bcrypt.hash(newpass,10);
        await usermodel.findByIdAndUpdate(_id,{password:hashedpass});
        res.json({success:true,msg:"Password Changed"});
    }
    catch(err){
        console.log(err);
        res.json({success:false,msg:"Error"})
    }
}


const getusers=async(req,res)=>{
    try{
        const users=await usermodel.find();
        res.json({success:true,users:users});
    }
    catch(err){
        console.log(err);
        res.json({success:false,msg:"Server Error"});
    }
}


const  deleteuser=async(req,res)=>{
    const { _id } = req.params;
  try{
    const deleted=await usermodel.findByIdAndDelete(_id);
    if(!deleted){
      return res.json({success:false,msg:"food item not found"});
    }
    res.json({ success: true, msg: "user deleted successfully" })
  }
  catch(err){
    console.log(err);
    res.json({ success: false, msg: "Server error" });
  }
}

const changestatus=async(req,res)=>{
    const orderId = req.params.id;
    const { newStatus } = req.body;
    const validStatuses = ["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];
    if (!validStatuses.includes(newStatus)) {
        return res.status(400).json({ error: "Invalid status" });
    }
    try {
        const updatedOrder = await ordermodel.findByIdAndUpdate(orderId,{ status: newStatus },{ new: true });
        if (!updatedOrder) return res.status(404).json({ error: "Order not found" });
        res.json({ message: "Status updated", order: updatedOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}


// login,signup,googlelogin,
module.exports={changeorders,getdetails,updateuser,changepassword,getusers,deleteuser,getorders,changestatus};