const ordermodel=require("../models/ordermodel");
const usermodel=require("../models/usermodel");
const Stripe=require("stripe");
require('dotenv').config();
const REDIRECT_URL=process.env.ORDER_REDIRECT_URL;
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);

const processorder=async(req,res)=>{
    const{address,items,amount,userid}=req.body;
    try{
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items:items.map(item => ({
                    price_data:{
                        currency:"inr",
                        product_data: { 
                            name: item.name,
                            images:[item.image]  
                        },                       
                        unit_amount: item.price*100,
                    },
                    quantity: item.quantity,
                })),
                mode: "payment",
                success_url: `${REDIRECT_URL}/verify?success=true`,
                cancel_url: `${REDIRECT_URL}/verify?success=false`,
            });
          res.json({success:true,sessionurl:session.url});
    }
    catch(err){
        console.log(err);
        res.json({success:false,msg:"Error in database"});
    }
}




module.exports=processorder;