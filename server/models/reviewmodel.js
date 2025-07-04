const mongoose=require("mongoose");

const reviewschema=new mongoose.Schema({
    foodId:{ type: mongoose.Schema.Types.ObjectId, ref: "fooditems" },
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    username: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const  reviewmodel=mongoose.models.reviews || mongoose.model("reviews",reviewschema);

module.exports=reviewmodel;