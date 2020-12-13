const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
         jwt.verify(token,req.app.get('scretKey'),(err,data)=>{
             if(data)
             {
                 req.userData=data;
                 next();
             }else{
                 res.status(401).json({
                     message:'token error !'
                 })
             }
            
        });
    }catch(error) {
        return res.status(401).send({
            message: 'Auth failed'
        });
    }
}