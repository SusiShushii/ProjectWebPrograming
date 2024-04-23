const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const bcrypt = require('bcrypt');
const saltRounds = 10
module.exports = function(connection) {
    router.post("/", jsonParser, function(req, res) {

        bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
             if (err) {
                res.json({ status: 'error', message: err });
                return;
            }
            try{
                const userid = await getuseridcon(connection);
                const email = req.body.email;
                const password = hash;
                const fname = req.body.fname || '';
                const lname = req.body.lname || '';
                const phonenum = req.body.phonenum || '';
                const sex = req.body.sex || '';
            // Store hash in your password DB.
            connection.execute(
                'INSERT INTO useraccount (userid, email, password, fname, lname, phonenum, sex) VALUES (?,?,?,?,?,?,?)',
                [userid, req.body.email, hash, fname, lname, phonenum, sex],
                function(err, results, fields) {
                    if (err) {
                        res.json({ status: 'error', message: err });
                        return;
                    }
                    res.json({ status: 'ok' });
                }
            );}
            catch(err){console.err}
        });
    });
    return router;
};

async function getuseridcon(connection) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT MAX(userid) AS max_userid FROM useraccount', (err, results) => {
            if (err) {
                console.error('Error retrieving maximum userid:', err);
                reject(err);
                return;
            }
            let maxUserId;
            if (results[0].max_userid == null || results[0].max_userid == 0) {
                maxUserId = 1;
            } else {
                maxUserId = results[0].max_userid + 1;
            }
            console.log('New UserID:', maxUserId);
            resolve(maxUserId);
        });
    });
}

