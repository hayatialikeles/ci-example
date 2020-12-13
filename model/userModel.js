const mongoose=require('mongoose');
const validator=require('validator');

const Schema = mongoose.Schema;
let userSchema = new Schema({
  fullname:String,
  username:{type:String,unique:true},
  age:Number,
  email:{type:String,validate:[validator.isEmail,"E-posta formatı doğru değil !"]},
  password:String
});

module.exports = mongoose.model('users', userSchema);