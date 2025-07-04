const usermodel=require("../models/usermodel");

const addtocart=async(req,res)=>{
    const {_id,itemid} = req.body;
    try{
        const user=await usermodel.findOne({_id});
        if(user){
            const cart=await user.cart;
            if(!user.cart[itemid]){
                user.cart[itemid]=1;
            }
            else{
                user.cart[itemid]+=1;
            }
            await usermodel.findByIdAndUpdate(_id,{cart});
            res.json({success:true,msg:"one item added",cart:user.cart});
        }
        else {
            res.json({success:false,msg:"User not found"});
        }
    } 
    catch(err){
        console.log(err);
        res.json({success:false,msg:"Error"});
    }
}

const removefromcart=async(req,res)=>{
    const {_id,itemid} = req.body;
    try{
        const user=await usermodel.findOne({_id});
        const cart=await user.cart;
        if(cart[itemid]>0){
            cart[itemid]-=1;
        }
        await usermodel.findByIdAndUpdate(_id,{cart});
        res.json({success:true,msg:"one item removed",cart:user.cart});
    }
    catch(err){
        console.log(err);
        res.json({success:false,msg:"Error"});
    }
}


const deleteitemfromcart=async(req,res)=>{
    const {_id,item} = req.body;
    try{
        const user=await usermodel.findOne({_id});
        const cart=await user.cart;
        cart[item._id]=0;
        await usermodel.findByIdAndUpdate(_id,{cart});
        res.json({success:true,msg:"deleted from cart",cart:user.cart});
    }
    catch(err){
        console.log(err);
        res.json({success:false,msg:"Error"});
    }
}



module.exports={addtocart,removefromcart,deleteitemfromcart};