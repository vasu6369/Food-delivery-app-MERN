const mongoose=require('mongoose')
const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB Connected Successfully!!");
    }catch(err){
        console.log(err);
    }
}
module.exports=connectDb;