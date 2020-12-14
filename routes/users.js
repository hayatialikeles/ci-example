var express = require('express');
var crypto =require('crypto');
var jwt = require('jsonwebtoken');
var authMiddle = require('../middleWare/authMiddle')
var router = express.Router();

const kullanici =require('../model/userModel')

router.post('/login', function(req, res, next) {
  if(req.body.username &&
    req.body.password
    ){
      const username=req.body.username;
      const password=crypto.createHash('md5').update(req.body.password).digest('hex');
      
      kullanici.findOne(
        {
          username:username,
          password:password
        },(err,data)=>{
        if(data)
        {
          const token=jwt.sign(
            {
              uid:data._id,
              fullname:data.fullname,
              username:data.username,
              email:data.email,
              age:data.age
            },req.app.get('scretKey'),{expiresIn:'365d'});


          res.status(200).json({
            state:true,
            message:'Giriş başarılı',
            token:token
          });
        }else{
          res.status(404).json({
            state:false,
            message:'Kullanıcı adı veya parola hatalı !'
          });
        }
        
      });
    }else{
      res.status(404).json({
        state:false,
        message:'Kullanıcı adı veya parola boş bırakılamaz'
      })
    }
});
router.post('/register', function(req, res, next) {
  if(req.body.username &&
    req.body.fullname && 
    req.body.password && 
    req.body.age && 
    req.body.email 
    ){
      const fullname=req.body.fullname;
      const username=req.body.username;
      const age=req.body.age;
      const email=req.body.email;
      const password=crypto.createHash('md5').update(req.body.password).digest('hex');
      let addState=new kullanici({
          fullname:fullname,
          username:username,
          age:age,
          password:password,
          email:email
      });

      addState.save((err,data)=>{
        if(data)
        {
          res.status(200).json({
            message:'Başarı ile  Kayıt oldunuz',
            data:data
          });
        }else{
          res.status(404).json({
            message:'İşlem başarısız oldu daha önce kullanılmış kullanıcı adı !'
          });
        }
      })
    }else{
      res.status(404).json({
        message:'Kullanıcı adı veya parola boş bırakılamaz'
      })
    }
});
router.post("/delete",authMiddle,function(req, res, next){
  if(req.body.uid)
  {
    kullanici.deleteOne({_id:req.body.uid},(err,data)=>{
      if(data)
      {
        res.status(200).json({
          message:"Kullanıcı başarı ile silindi"
        });
      }else{
        res.status(404).json({
          message:'Kullanıcı silinemedi !'
        })
      }
    });
  }else{
    res.status(404).json({
      message:'paramter error'
    })
  }
});
router.get("/getUser",authMiddle,function(req, res, next){
  kullanici.find({},{
    password:0
  },(err,data)=>{
    res.json(data);
  });
});


module.exports = router;
