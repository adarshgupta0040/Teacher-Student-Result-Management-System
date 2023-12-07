const express = require('express');
const connection = require('../connection');
const req = require('express/lib/request');
const router = express.Router();

router.post('/add', (req, res) => {
    let studentDetails = req.body;
    query = "insert into studentDetails(RollNumber,studentName,DateOfBirth,Score) values (?,?,?,?)";
    connection.query(query, [studentDetails.RollNumber, studentDetails.studentName, studentDetails.DateOfBirth, studentDetails.Score], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Added Successfully" });
        }
        else {
            return res.status(500).json(err)
        }
    })
})

router.post('/edit', (req, res) => {
    let Details = req.body;
    query = "UPDATE studentDetails SET studentName = ? , DateOfBirth=? , Score=? WHERE RollNumber = ?";
    connection.query(query, [Details.studentName, Details.DateOfBirth, Details.Score, Details.RollNumber], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "RollNumber does not found" });
            }
            return res.status(200).json({ message: "Details successfully Updated" , results});
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.post('/delete', (req, res) => {
    let studentDetails = req.body;
    query = "DELETE FROM studentDetails WHERE RollNumber=?";
    connection.query(query, [studentDetails.RollNumber], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "RollNumber does not found" });
            }
            return res.status(200).json({ message: "Details successfully Deleted" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.post('/viewresult', (req, res) => {
    let details = req.body;
    query = "select * from studentdetails where RollNumber=? and DateOfBirth=?";
    connection.query(query, [details.RollNumber, details.DateOfBirth], (err, results) => {
        if (!err) {
            if (results.length <= 0) {
                return res.status(401).json({ message: "No Result Found" });

            }
            else {
                // return res.status(200).json({ message: "Result Found Successfully" });
                return res.status(200).json(results);
            }
        }
        else {
            return res.status(500).json(err)
        }
    })
})
module.exports = router;