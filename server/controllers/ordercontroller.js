const ordermodel=require("../models/ordermodel");
const usermodel=require("../models/usermodel");
const Stripe=require("stripe");

const stripe=new Stripe("sk_test_51QvdPw4ZsdXuJQZbWfD9PKS9gqRnDQYAkL6nEFpBTKhdJJEEom34MQpTjd1tjfentU5qSQxo0H3Xfc70a1DUrwOU00JIxkBSW4");

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
                success_url: `http://localhost:5173/verify?success=true`,
                cancel_url: "http://localhost:5173/verify?success=false",
            });
          res.json({success:true,sessionurl:session.url});
    }
    catch(err){
        console.log(err);
        res.json({success:false,msg:"Error in database"});
    }
}




module.exports=processorder;