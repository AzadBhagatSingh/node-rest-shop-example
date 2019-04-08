const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const porductRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect('mongodb://localhost:27017/db-node-shop');
var conn = mongoose.connection;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


conn.on('connected',function(){
    console.log("Connected Successfully!!!");
});
conn.on('disconnected',function(){
    console.log("Disconncted Successfuly!!!");
});
conn.on('error',console.error.bind(console,"Error Detected!!!"));

//To remove CORS Erros
app.use((req,res,next) =>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Origin, X-Request-with, Content-Type, Accept, Authorization");
    if(res.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Routes which should handle requests
app.use('/products', porductRoutes);
app.use('/orders', orderRoutes);

//middleware to custom error handling
app.use((req,res,next) =>{
    const error = new Error('Not Found in This App!');
    error.status = 404;
    next(error);
});

//middleware to default error handling
app.use((error,req,res,next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;