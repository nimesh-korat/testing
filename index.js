const express = require("express");
const connectDB = require("./db/dbConnect");
const cors = require("cors");
const session = require('express-session');
const Session = require("./apis/session");
const Logout = require("./apis/logout");
const { SignUpApi } = require("./apis/signup");
const { LoginApi } = require("./apis/login");
const multer = require("multer");
const { AddProduct } = require("./apis/addProduct");
const { profilePicUpload, productPicUpload, editProductPicUpload } = require("./multer/multerUpload");
const { GetProduct } = require("./apis/getProduct");
const { EditProduct } = require("./apis/editProduct");
const { DeleteProduct } = require("./apis/deleteProduct");
const { FetchAllProducts } = require("./apis/fetchAllProducts");
const MongoStore = require('connect-mongo');
const cookieParser = require("cookie-parser");
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

//initialize app
const app = express();

//initialize PORT No
const PORTS = 8001;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Configure express-session middleware
// app.use(cookieParser());

app.use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    const allowedOrigins = ['http://localhost:3000', 'https://testing-front-jf19.onrender.com'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.set("trust proxy", true);
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    // store: new MongoStore({
    //     mongoUrl: process.env.MONGODB_URL,
    //     autoRemove: 'interval',
    //     autoRemoveInterval: 1440
    // }),
    cookie: {
        secure: false,
        domain: '.onrender.com',
        maxAge: 1000 * 60 * 60 * 24 //oneDay
    }
}));

app.use('/images/productPics', express.static('images/productPics'));
app.use('/images/profilePics', express.static('images/profilePics'));

//signup API
app.post("/signup", profilePicUpload.single("profilePic"), SignUpApi);

//login API
app.post("/login", LoginApi);

//Session API
app.post("/session", Session);

//addProduct API
app.post("/addProduct", productPicUpload.single("pImg"), AddProduct);

//getProduct API
app.post("/getProduct", GetProduct);

//getProduct API
app.post("/fetchAllProducts", FetchAllProducts);

//getProduct API
app.post("/editProduct", editProductPicUpload.single("pImg"), EditProduct);

//deleteProduct API
app.post("/deleteProduct", DeleteProduct);

//logout API
app.post("/logout", Logout);


//callback to connect MongoDB
connectDB();

//Activate Server
app.listen(process.env.PORT || PORTS, () => {
    console.log("Server Started on port: ", process.env.PORT);
});
