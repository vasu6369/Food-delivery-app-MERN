const express=require('express');
const {signup,login,googlelogin} =require('../middleware/auth.js')
const authrouter=express.Router();

authrouter.post('/login',login);
authrouter.post('/signup',signup);
authrouter.post('/googlelogin',googlelogin);

module.exports=authrouter;