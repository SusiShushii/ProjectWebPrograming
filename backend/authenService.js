const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = "generatedkey";

module.exports = function(connection) {
    router.post("/", jsonParser, function(req, res, next) {
        try{
            const token = req.headers.authorization.split(' ')[1];
            var decoded = jwt.verify(token,secret);
            res.json({status: 'ok',decoded})
        }
        catch(err){
            res.json({status:'error',message: err.message})
        }
    }
    );
return router;
};