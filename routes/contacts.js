const express = require('express');
const router = express.Router();
// @route  GET api/contacts
// @desc Get all  User contacts
// @acess Private
router.get('/', (req,res)=>{
    res.send('Get all Contacts');
})


// @route  POST api/contacts
// @desc Add new contacts
// @acess Private
router.post('/', (req,res)=>{
    res.send('Add all contacts');
});

// @route  PUT api/contacts
// @desc Updatecontacts
// @acess Private
router.put('/:id', (req,res)=>{
    res.send('Update Contacts');
});
   

// @route  Delete api/contacts
// @desc Updatecontacts
// @acess Private
router.delete('/:id', (req,res)=>{
    res.send('Delete Contacts');
});

module.exports  = router;