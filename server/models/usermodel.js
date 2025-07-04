const mongoose=require("mongoose");

const userschema=new mongoose.Schema({
    name:{type:String,required:true},
    email: { type: String, required: true, unique: true },
    picture: { type: String,default:"" },
    password: { type: String, default: "" },
    role:{type:String,default:"customer"},
    cart: { type:Object, default: {} },
    wishlist: { type: Object, default: {} },
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "orders" }]
},{minimize:false});

const usermodel=mongoose.models.users || mongoose.model("users",userschema);

module.exports=usermodel;
