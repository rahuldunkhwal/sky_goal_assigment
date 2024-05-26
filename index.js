const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.RAHUL_URI;

const app = express();

const userRoutes = require('./router/user');
app.use(express.json());

app.use(userRoutes);

app.use('/', (req, res) => {
    res.send('Hello World');
})


mongoose.connect(uri)
    .then(() => {
        console.log('connected to db');
        app.listen(3000);
    })
    .catch(err => console.log(err));
