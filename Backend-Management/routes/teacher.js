const express = require('express');
const connection = require('../connection');
const req = require('express/lib/request');
const router = express.Router();

router.post('/teacherlogin', (req, res) => {
    let teacher = req.body;
    query = "select password from teachers where password=?";
    connection.query(query, [teacher.password], (err, results) => {
        if (!err) {
            if (results.length <= 0 || results[0].password != teacher.password) {
                return res.status(401).json({ message: "Incorrect Password" });

            }
            else if (results[0].status == 'false') {
                return res.status(401).json({ message: "wait for Admin Approval" });
            }
            else {
                return res.status(200).json({ message: "Login Successfully" })
            }
        }
        else {
            return res.status(500).json(err)
        }
    })
})

router.get('/viewall', (req, res) => {
    query = "select * from studentdetails";
    connection.query(query, (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(401).json({ message: "No Student Added" });

            }
            else {
                return res.status(200).json( results );
            }
        }
        else {
            return res.status(500).json(err)
        }
    })
})


module.exports = router;