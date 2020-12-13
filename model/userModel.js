const mongoose=require('mongoose');

const Schema = mongoose.Schema;
let userSchema = new Schema({
  fullname:String,
  username:String,
  age:Number,
  email:String,
  password:String
});

module.exports = mongoose.model('users', userSchema);