const foodmodel = require("../models/foodmodel");
const ordermodel=require("../models/ordermodel");

const listfood = async (req, res) => {
  try {
    const foods = await foodmodel.find({});
    res.json({success: true, data: foods });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Error fetching food data" });
  }
};


const addfood=async(req,res)=>{
  try{
    await foodmodel.insertMany(req.body);
    res.json({success:true});
  }
  catch(err){
    console.log(err);
    res.json({success:false});
  }
}


const deletefood=async(req,res)=>{
  const { _id } = req.params;
  try{
    const deleted=await foodmodel.findByIdAndDelete(_id);
    if(!deleted){
      return res.json({success:false,msg:"food item not found"});
    }
    res.json({ success: true, msg: "Food item deleted successfully" })
  }
  catch(err){
    console.log(err);
    res.json({ success: false, msg: "Server error" });
  }
}


const updatefood=async(req,res)=>{
  const { _id, name, description, price, url } = req.body;
  try {
    const updatedFood = await foodmodel.findByIdAndUpdate(_id,{ name, description, price, url },{ new: true });
    if (!updatedFood) {
      return res.json({ success: false, msg: "Food item not found" });
    }
    res.json({ success: true, msg: "Food item updated successfully", data: updatedFood });
  } catch (err) {
    console.log(err);
    res.json({ success: false, msg: "Server error" });
  }
}


const listorders=async(req,res)=>{
  try {
    const orders = await ordermodel.find()
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "Server error" });
  }
}

module.exports = { listfood,addfood,deletefood,updatefood,listorders };