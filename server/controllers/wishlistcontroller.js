const usermodel=require("../models/usermodel");
const togglewishlist=async(req,res)=>{
    const {_id,itemid}=req.body;
    try{
        let val='';
        const user=await usermodel.findOne({_id});
        const wishlist=await user.wishlist;
        if(!user.wishlist[itemid]){
            user.wishlist[itemid]=true;
            val=true;
        }
        else{
            user.wishlist[itemid]=false;
            val=false;
        }
        await usermodel.findByIdAndUpdate(_id,{wishlist});
        res.json({success:true,msg:`${val?"Added to wishlist":"Removed from wislist"}`,wish:user.wishlist});
    }
    catch(err){
        console.log(err);
        res.json({success:false,msg:"Error"});
    }
}


module.exports={togglewishlist};