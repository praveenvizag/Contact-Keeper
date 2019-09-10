const express = require('express');
const router = express.Router();
// @route  POST api/users
// @desc Register a User
// @acess Public
router.post('/', (req,res)=>{
    res.send('Register a User');
})

module.exports  = router;