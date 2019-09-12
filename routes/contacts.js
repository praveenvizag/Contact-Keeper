const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth');
const Contacts = require('../models/Contacts');

// @route  GET api/contacts
// @desc Get all  User contacts
// @acess Private
router.get('/', auth,async (req,res)=>{
   try {
const contacts = await Contacts.find({user:req.user.id}).sort({date:-1});
res.json(contacts);
   } catch(err) {
console.error(err);
res.send("Server error");

   }
});


// @route  POST api/contacts
// @desc Add new contacts
// @acess Private
router.post('/',[auth,[
check('name', 'Name is required').not().isEmpty()

]] , async (req,res)=>{
    const errors = validationResult(req);
   if(!errors.isEmpty()) {
       return res.status(400).json({errors:errors.array()});
   }
   const {name,email,type,phone} = req.body;
   try {
       const newContact = new Contacts({
           name,email,phone,type,user:req.user.id
       });

       const contact = await newContact.save();
       res.json(contact);
   } catch(err) {
console.error(err.message);
res.send('Server error');

   }
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