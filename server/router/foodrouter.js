const express = require("express");
const { listfood,addfood,deletefood,updatefood,listorders } = require("../controllers/foodcontroller"); 

const foodrouter = express.Router();

foodrouter.get("/list", listfood);
foodrouter.post("/add", addfood);
foodrouter.put("/updatefood", updatefood);
foodrouter.get("/listorders", listorders);
foodrouter.delete("/deletefood/:_id", deletefood);

module.exports = foodrouter;