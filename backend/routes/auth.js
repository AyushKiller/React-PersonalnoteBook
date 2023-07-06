const express=require('express');
const router=express.Router();
const User=require('../modals/User')
const{body,validationResult}=require('express-validator')
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET='IamMFstarBoy'
//ROUTE 1:Create a user using POST "/api/auth/crateuser".No login required
router.post('/createuser',
[body('name','Enter a valid name').isLength({min:4}),
body('email','Enter the valid email').isEmail(),
body('password','Enter atleat one alphabet and one number').isLength({min:6})

],async(req,res)=>{
  let success=false
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({success, errors: result.array() });
    }
  try{
    // to  check email is not same
    let user= await User.findOne({email:req.body.email});
    if (user){
      return res.status(400).json({success,error:"Email already exits"});
    
    }
    //Create a new user
    const salt= await bcrypt.genSalt(10);
     const secPass=await bcrypt.hash( req.body.password,salt);   
     user = await User.create({
    name:req.body.name,
    email:req.body.email,
    password:secPass,
})
//this is used when user login in a protected route soo it will send a token if user is logged in soo there is no hacking
const data={
  user:{
    id:user.id
  }
 }
 const authtoken=jwt.sign(data,JWT_SECRET); 
 success=true,
  res.json({success,authtoken});
  }catch(error){if(error.code===111000){
    return res.send({ errors: result.array() });
  }//if there is an issue in code
  console.error(error);
  res.status(500).json({error:'Server error',message:error.message}); 
  return; 
 } 
return;
})
//ROUTE:2 Authenticate a user using POST "/api/auth/loginuser".No login required
router.post('/loginuser',
[
body('email','Enter the valid email').isEmail(),
body('password','password cannot be blank').exists(),

],async(req,res)=>{
  let success=false
  const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.send({ errors: result.array() });
    }
  const {email,password}= req.body;
  try{
    let user= await User.findOne({email});
    if (!user){
      success=false
      return res.status(400).json({ success,error:"Try to log in with correct crodentils"});
    
    }
    const passwordCompare= await bcrypt.compare(password,user.password);
     if (!passwordCompare){
       return res.status(400).json({success,error:"Try to log in with correct crodentils"});
     }
     const data={
  user:{
    id:user.id
  }
 }
 const authtoken=jwt.sign(data,JWT_SECRET);
 success=true,
 res.json({success,authtoken});

  }catch(error){if(error.code===111000){
    return res.send({ errors: result.array() });
  }//if there is an issue in code
  console.error(error);
  res.status(500).json({error:'Server error',message:error.message}); 
  return; 
 } 
return;
})
//ROUTE 3:Get logedinuser Detail using POST"/api/auth/getuser". login required

router.post('/getuser',fetchuser,async (req,res)=>{
try{
  const userID=req.user.id;
const user=await User.findById(userID).select("-password")
res.send(user);
}catch(error){if(error.code===111000){
  return res.send({ errors: result.array() });
}//if there is an issue in code
console.error(error);
res.status(500).json({error:'Server error',message:error.message}); 
return; 
} 
return;
})
  
module.exports=router;