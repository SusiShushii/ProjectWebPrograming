const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();

module.exports = function(connection) {   
    router.put("/", jsonParser, async function(req, res, next) {
        const productId = req.body.productId;
        if (!productId) {
            return res.status(400).json({ status: 'error', message: 'Product ID is required' });
        }

        connection.execute(
            'UPDATE product SET image=?, pname=?, price=?, brand=?, size=?, material=?, isnew=? WHERE productid=?',
            [req.body.image, req.body.pname, req.body.price, req.body.brand, req.body.size, req.body.material, req.body.isnew, productId],
            function(err, results, fields) {
                if (err) {
                    res.status(500).json({ status: 'error', message: err });
                    return;
                }
                res.json({ status: 'ok' });
            }
        );  
    });
    return router;
};
