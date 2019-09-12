const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  type: {
    type: String,
   default:'personal'
  },
    email: {
    type: String,
    required: true,
    unique: true
  },
  

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact',ContactSchema);
