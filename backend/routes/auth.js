require('dotenv').config()
const express = require('express');
const User = require('../models/User');
const router = express.Router();
var bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken'); 
var fetchUser = require('../middleware/fetchuser');


const JWT_SECRET = process.env.JWT_SECRET;


// ROUTE 1: Create a User using: POST "/api/auth/createuser". 
router.post('/createuser', [
    body('name',"Enter valid Name").isLength({min:2}),
    body('email',"Enter valid Email").isEmail(),
    body('password',"Password must be atleast 5 charecters").isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    
    try {
    //Check id user with same email already exist
    let user = await User.findOne({email : req.body.email})

    if(user){
      return res.status(400).json({ errors: "Sorry user with this email already exist" }); 
    }

    const salt  = await bcrypt.genSalt(10);
    let encPass = await bcrypt.hash(req.body.password,salt);

    //id user not exist then create a user in database
     user = await User.create({
      name : req.body.name,
      email : req.body.email,
      password : encPass
    });

    const data = {
      user : {
        id:user.id
      }
    }

    const authToken = jwt.sign(data,JWT_SECRET);

    res.json({authToken});

  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured !");
  } 
});


// ROUTE 2: Authenticate a User using: POST "/api/auth/login".
router.post('/login',[
  body('email', 'Enter a valid email').isEmail(),
  body('password','Password Cannot be blank !').exists()
],async (req,res)=> {

    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;

    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error:'Please Check your Credentials!'});
      }

      const passCmp = await bcrypt.compare(password,user.password);
      if(!passCmp){
        return res.status(400).json({error:'Please Check your Credentials!'});
      }

      const data = {
        user:{
          id:user.id
        }
      }

      const authToken = jwt.sign(data,JWT_SECRET);
      res.json({authToken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured !");
    }
  
});

//Route 3 : Get Logged in User Details using POST "/api/auth/getuser" login required
router.post('/getuser',fetchUser,async (req,res)=>{

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured !");
  }

});



module.exports = router 