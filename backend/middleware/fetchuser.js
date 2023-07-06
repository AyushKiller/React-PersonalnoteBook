const { json } = require('express');
const jwt= require('jsonwebtoken');
const{body,validationResult}=require('express-validator')
const JWT_SECRET='IamMFstarBoy';
const fetchuser=(req,res,next)=>{
    //get the user from jwt tokan
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using valid token"})
    }
    try{
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
      
        next();
    }
    catch{
        res.status(401).send({error:"Please authenticate using valid token",message:error.message})
    }
   
}

module.exports=fetchuser;