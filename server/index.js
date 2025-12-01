require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const foodrouter = require("./router/foodrouter");
const userrouter=require("./router/userrouter");
const cartrouter = require("./router/cartrouter");
const wishrouter=require("./router/wishrouter");
const processorder=require("./controllers/ordercontroller");
const reviewrouter = require("./router/reviewrouter");
const { login, authenticateToken } = require("./middleware/auth");
const authrouter = require("./router/authrouter");

connectDB();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use("/auth",authrouter);

app.use("/foods",foodrouter);
app.use("/user",authenticateToken,userrouter);      
app.use("/cart",authenticateToken,cartrouter);

app.use("/wishlist",authenticateToken,wishrouter);
app.post("/processorder",authenticateToken,processorder);

app.use("/review",authenticateToken,reviewrouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});


app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
