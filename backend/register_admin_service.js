const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const bcrypt = require('bcrypt');
const saltRounds = 10
module.exports = function(connection) {
    router.post("/", jsonParser, function(req, res) {

        bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
            // Store hash in your password DB.
            connection.execute(
                'INSERT INTO adminaccount (email, password, fname) VALUES (?,?,?)',
                [req.body.email, hash, req.body.fname],
                function(err, results, fields) {
                    if (err) {
                        res.json({ status: 'error', message: err });
                        return;
                    }
                    res.json({ status: 'ok' });
                }
            );
        });
    });
    return router;
};


