const mongoose=require('mongoose');

const Schema = mongoose.Schema;


const postScheme=new Schema({
    title:String,
    explanation:String,
    addDate:String,
    addUid:Number,
    approvalState:{
        type:Number,
        default:2 // 1=approval || 2=checking  || 3=rejected
    },
    approvelAdminId:Number,
    rejectedDate:{
        type:String,
        default:''
    },
    rejectedExplanation:{
        type:String
    },
    viewCount:Number

});
module.exports= mongoose.model("posts",postScheme);