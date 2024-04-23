const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();

module.exports = function(connection) {   
    router.delete("/", jsonParser, async function(req, res, next) {
        try{
            var productId = req.body.productid;
            
            if (productId === undefined) {
                res.status(400).json({ status: 'error', message: 'productid is required' });
                return;
            }
            await connection.execute
            ('DELETE FROM product WHERE productid = ?', [productId]);
            res.json({ status: 'ok' });
        }
        catch(err){
            console.error("Error deleting product: ",err);
            res.json({ status: 'error', message: err });
        }  
    }
    );
    return router;
};
