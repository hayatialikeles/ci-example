var express = require('express');
var authMiddle = require('../middleWare/authMiddle')
var router = express.Router();

const postModel =require('../model/postModel')

router.get('/get/general/latest',authMiddle,function(req, res, next) {
    postModel.find({
      approvalState:1
    },{
      approvalState:0,
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
router.get('/get/user/list',authMiddle,function(req, res, next) {
  if(req.query.uid)
  {
    postModel.find({
      addUid:req.query.uid
    },  
    {
      addUid:0
    }
    ,{
      addDate:'desc'
    },(err,data)=>{
      if(data)
      {
        res.status(200).json(data);
      }else{
        res.status(401).json({
          message:'işlem başarısız oldu !',
          error:err
        });
      }
    });
  }else{
    res.status(401).json({
      message:'kullanıcı kimliği uzak sunucuya iletilemedi !'
    });
  }

});

router.post('/new',authMiddle, function(req, res, next) {
  if(
    req.body.title &&
    req.body.explanation 
    ){
      const title=req.body.title;
      const explanation=req.body.explanation;
      let addState=new postModel({
          title:title,
          explanation:explanation,
          addUid:req.userData.uid,
          addDate:new Date(),
          viewCount:0
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
router.post('/edit',authMiddle, function(req, res, next) {
  if(
    req.body.title &&
    req.body.explanation &&
    req.body.postId 
    ){
      const title=req.body.title;
      const explanation=req.body.explanation;
      const postId=req.body.postId;
      
      postModel.updateOne({_id:postId},{
        title:title,
        explanation:explanation
      },(err,data)=>{
        if(data)
        {
          res.status(200).json({
            message:'gönderi başarı ile düzenlendi !',
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
router.post('/delete',authMiddle, function(req, res, next) {
  if(req.body.postId){
      const postId=req.body.postId;
      postModel.findById(postId,{_id:0,addUid:1},(error,postData)=>{
        if(postData.addUid==req.userData.uid)
        {
          postModel.deleteOne({_id:postId},(err,data)=>{
            if(data)
            {
              res.status(200).json({
                message:'gönderi başarı ile düzenlendi !',
                data:data
              });
            }else{
              res.status(404).json({
                message:'İşlem başarısız oldu !'
              });
            }
          });
        }else{
          res.status(404).json({
            message:'size ait olmayan bir postu silmezsiniz !'
          });
        }
    });

    }else{
      res.status(404).json({
        message:'lütfen ilk önce bir post seçiniz !'
      })
    }
});

router.post("/set/viewcount",authMiddle,function(req, res, next){
  if(req.body.postId)
  {
    postModel.findById(req.body.postId,{
      viewCount:1
    },(err,data)=>{
      if(data)
      {
          const viewcount=(parseInt(data.viewCount)+1);
          postModel.updateOne({_id:req.body.postId},{
            viewCount:viewcount
          },(updateError,updateData)=>{
            if(updateData)
            {
              res.status(200).json(updateData);
            }else{
              res.status(401).json({
                message:'işlem başarısız oldu !',
                error:updateError
              });
            }
          })
      }else{
        res.status(401).json({
          message:'post bulunamadı !',
          error:err
        });
      }

    });
  }else{
    res.status(404).json({
      message:'gerekli değerler uzak sunucuya iletilemedi !'
    })
  }
});



module.exports = router;
