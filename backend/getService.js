const mysql = require('mysql2')
const express = require('express');
const app = express();
const router = express.Router();
const jsonParser = require('body-parser').json();
const cors = require('cors')

app.use(cors())

module.exports = function(connection) {   
    router.get("/", jsonParser, async function(req, res) {
        try{
            connection.query('SELECT * FROM product', function(err, result) {
                if(err) {
                    console.error(err);
                    res.status(500).json({ error: err });
                } else {
                    const data = JSON.parse(JSON.stringify(result));
                    console.log(data);
                    res.json(data);
                }
            })
        }
        catch(err){
            console.error(err)
            res.status(500).json({ error: err });
        }
    }
    );
    router.get("/productid=:productid", async function(req, res) {
        try {
            const productId = req.params.productid;
            connection.query('SELECT * FROM product WHERE productid = ?', [productId], function(err, result) {
                if(err) {
                    console.error(err);
                    res.status(500).json({ error: 'Internal server error' });
                } else {
                    const data = JSON.parse(JSON.stringify(result));
                    console.log(data);
                    res.json(data);
                }
            });
        } catch (error) {
            console.error('Error retrieving product details:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    return router;
};
