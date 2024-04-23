const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();

module.exports = function(connection) {   
    router.post("/", jsonParser, async function(req, res, next) {
        productid = await getuseridcon(connection);
        connection.execute(
            'INSERT INTO product (productid, image,pname,price,brand,size,material,isnew) VALUES (?,?,?,?,?,?,?,?)',
            [productid,req.body.image, req.body.pname, req.body.price,req.body.brand, req.body.size,req.body.material,req.body.isnew],
            function(err, results, fields) {
                if (err) {
                    res.json({ status: 'error', message: err });
                    return;
                }
                res.json({ status: 'ok' });
            }
        );  
    }
    );
    return router;
};

async function getuseridcon(connection) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT MAX(productid) AS max_productid FROM product', (err, results) => {
            if (err) {
                console.error('Error retrieving maximum productid:', err);
                reject(err);
                return;
            }
            let maxProductid;
            if (results[0].max_productid == null || results[0].max_productid == 0) {
                maxProductid = 1;
            } 
            else {
                maxProductid = results[0].max_productid + 1;
            }
            console.log('New Product ID:', maxProductid);
            resolve(maxProductid);
        });
    });
}