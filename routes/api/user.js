const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const validateSignupInput = require("../../validations/signup")
const validateLoginInput = require('../../validations/login');
const User = require("../../models/User");


// Signup  and new User
router.post("/signup", (req,res)=>{
    const {errors, isValid} = validateSignupInput(req.body);
    const { user_name, email,password} = req.body;
    if(!isValid){
        return res.status(400).json(errors);
    }
    User.findOne({ $or: [{ email},{user_name}] }).then(user => {
        if(user) {
            if (user.email === email)
            return res.status(400).json({email:"Email already exists"});
            else 
                return res.status(400).json({user_name:"Username already exists"});
        } 
         else {
             const newUser = new User ({user_name,email,password});

             //hastag passowrd before storing it in db
             bcrypt.genSalt(10,(err,salt) =>
             {
                 bcrypt.hash(newUser.password,salt,(err,hash)=> {
                     if (err) throw err;
                     newUser.password= hash;
                     newUser.save().then(user=>res.json(user)).catch(err => console.log({error:"error creating new user"})
                     )
         })
        })

        }   
    })
})


// Login
router.post("/login", (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);

    }
    const {email, password } = req.body;
    User.findOne({email}).then(user => {
        if(!user) {
            return res.status(404).json({email: "Email not found"});
        }
        bcrypt.compare(password,user.password).then(isMatch => {
            if(isMatch) {
                const payload ={
                    id: user.id,
                    user_name:user.user_name,
                };
                jwt.sign(payload,SECRET, {expiresIn:3600},(err,token)=>
                {
                    if(err) {
                        console.log(err);
                    }
                    return res.json({
                        success: true,
                        token : "Bearer " + token,
                    });
                });
            
              }  else{
                    return res.status(400).json({password:"password Incorrect"});

                }  
        })
    })

})
module.exports = router;