const express = require('express');
const router = express.Router();
// @route  GET api/auth
// @desc Get  Logged in User
// @acess Privtae
router.get('/', (req,res)=>{
    res.send('Get Logged in User');
})


// @route  POST api/auth
// @desc Auth user adn login
// @acess Privtae
router.post('/', (req,res)=>{
    res.send(' Log in User');
})


module.exports  = router;