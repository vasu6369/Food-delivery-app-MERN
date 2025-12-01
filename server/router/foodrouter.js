const express = require("express");
const { listfood,addfood,deletefood,updatefood,listorders } = require("../controllers/foodcontroller"); 
const { authenticateToken } = require("../middleware/auth");

const foodrouter = express.Router();

foodrouter.get("/list", listfood);
foodrouter.post("/add",authenticateToken,addfood);
foodrouter.put("/updatefood",authenticateToken,updatefood);
foodrouter.get("/listorders",authenticateToken,listorders);
foodrouter.delete("/deletefood/:_id",authenticateToken,deletefood);

module.exports = foodrouter;