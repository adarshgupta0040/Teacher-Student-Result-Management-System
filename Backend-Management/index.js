const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const teacherRoute = require('./routes/teacher');
const studentRoute = require('./routes/student');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/teacher', teacherRoute); 
app.use('/student',studentRoute);

module.exports = app;