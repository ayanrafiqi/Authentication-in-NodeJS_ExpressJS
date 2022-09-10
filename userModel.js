//require('dotenv').config();
const mongoose = require("mongoose");
//const encryt= require('mongoose-encryption');
// above encrypt is not used in md5 package
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

//userSchema.plugin(encryt,{secret:process.env.SECRET,encryptedFields:['password']})
// we remove this plugin schema when we started hashing our password
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
