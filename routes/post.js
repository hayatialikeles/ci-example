var express = require('express');
var authMiddle = require('../middleWare/authMiddle')
var router = express.Router();

const postModel =require('../model/postModel')

router.get('/get/last/approval',authMiddle,function(req, res, next) {
    postModel.find({
      approvalState:1
    },{
      approvelAdminId:0,
      rejectedDate:0,
      rejectedExplanation:0
    },{
      addDate:'desc'
    },(err,data)=>{
      if(data)
      {
        res.status(200).json(data);
      }else{
        res.status(401).json({
          message:'işlem başarısız oldu !'
        })
      }
    });
});
router.post('/new/post',authMiddle, function(req, res, next) {
  if(
    req.body.title &&
    req.body.explanation 
    ){
      const title=req.body.title;
      const explanation=req.body.explanation;
      
      let addState=new postModel({
          title:title,
          explanation:explanation,
          addUid:req.userData._id,
          addDate:new Date()
      });

      addState.save((err,data)=>{
        if(data)
        {
          res.status(200).json({
            message:'gönderi başarı ile iletildi !',
            data:data
          });
        }else{
          res.status(404).json({
            message:'İşlem başarısız oldu !'
          });
        }
      })
    }else{
      res.status(404).json({
        message:'Başlık ve açıklama alanı boş bırakılamaz !'
      })
    }
});
/*
router.post("/get/post/detail",authMiddle,function(req, res, next){
  if(req.body.postIdn)
});
*/


module.exports = router;
