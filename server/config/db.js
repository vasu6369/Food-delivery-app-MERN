const mongoose=require('mongoose')
const connectDb=async()=>{
    try{
        await mongoose.connect("mongodb+srv://gvasu:1234@cluster0.6umab.mongodb.net/fastfoodie");
        console.log("DB Connected Successfully!!");
    }catch(err){
        console.log(err);
    }
}
module.exports=connectDb;