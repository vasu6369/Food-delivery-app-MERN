const mongoose = require("mongoose");

const foodschema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  url: { type: String, required: true },
});

const foodmodel = mongoose.models.fooditems || mongoose.model("fooditems", foodschema);

module.exports = foodmodel;
