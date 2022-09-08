require('dotenv').config();
const mongoose = require("mongoose");
const encryt= require('mongoose-encryption');

const userSchema = new mongoose.Schema({
  email : String,
  password :String 
});


userSchema.plugin(encryt,{secret:process.env.SECRET,encryptedFields:['password']})
module.exports = mongoose.model("User", userSchema);