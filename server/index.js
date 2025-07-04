const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const foodrouter = require("./router/foodrouter");
const userrouter=require("./router/userrouter");
const cartrouter = require("./router/cartrouter");
const wishrouter=require("./router/wishrouter");
const processorder=require("./controllers/ordercontroller");
connectDB();

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());


app.use("/foods",foodrouter);
app.use("/user",userrouter);
app.use("/cart",cartrouter);

app.use("/wishlist",wishrouter);
app.post("/processorder",processorder);



app.get("/", (req, res) => {
  res.send("Hello World");
});


app.listen(port, () => {
  console.log(`Server started`);
});
