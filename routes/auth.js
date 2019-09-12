const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')

// @route  GET api/auth
// @desc Get  Logged in User
// @acess Privtae
router.post('/',[
    check('email','Plz include valid email').isEmail(),
    check('password','Required').exists()
] , async (req,res)=>{
    const errors = validationResult(req);
    if(!errors){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password} = req.body;
    try {
        let user  = await User.findOne({email});
        if(!user) {
            return res.stats(400).json({msg:'Invalid credentilas'});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) {
            return res.stats(400).json({msg:'Invalid credentilas'});  
        }
        const payload = {
            user:{
                id:user.id
            }
        }
       
        jwt.sign(payload,config.get('jwtSecret'),{
            expiresIn:360000
        },
        (err,token)=>{
            if(err) throw err;
            res.json({token})
        })

    } catch(err) {
        console.error(err.message);
        res.json('server error');

    }
})


// @route  POST api/auth
// @desc Auth user adn login
// @acess Privtae
router.get('/', auth, async (req,res)=>{
    try {
 const user = await User.findById(req.user.id).select('-password');
 res.json(user);
    } catch (err) {
console.error(err.message);
res.status(500).send('Server error');
    }
})


module.exports  = router;