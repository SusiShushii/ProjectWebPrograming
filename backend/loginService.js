const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = "generatedkey";

module.exports = function(connection) {
    router.post("/", jsonParser, function(req, res, next) {
    connection.execute(
        'SELECT * FROM useraccount WHERE email=?',
                [req.body.email],
                function(err, useraccount, fields) {
                    if (err) {res.json({ status: 'error', message: err }); return}
                    if (useraccount.length == 0) {res.json({status: 'error',message:'no user found'}); return }
                    bcrypt.compare(req.body.password,useraccount[0].password,function(err, isLogin){
                        if(isLogin==true){
                            var token = jwt.sign({email: useraccount[0].email},secret,{expiresIn: '1h' });
                            res.json({status:'ok',message:'login success',token});
                        }
                        else{
                            res.json({status:'error',message:'login failed'})
                        }
                    });
                }
            );
     
        
    });

    return router;
};