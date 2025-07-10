const reviewmodel=require("../models/reviewmodel");

const getreviewsbyid=async(req,res)=>{
    const {foodId}=req.body;
    try{
        const reviews=await reviewmodel.find({foodId:foodId});
        res.json({success:true,data:reviews});
    }
    catch(err){
        console.log(err);
        res.json({success:false,msg:"server error"});
    }
}

const addReview = async (req, res) => {
    const { foodId, userId, username, rating, comment } = req.body;
    try {
        const newReview = await reviewmodel.create({ foodId, userId, username, rating, comment});
        res.json({ success: true, data: newReview });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, msg: "Server error" });
    }
};

module.exports={getreviewsbyid,addReview};