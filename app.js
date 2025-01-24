const express= require('express');
const app=express();

const cookieParser= require('cookie-parser');
const path= require('path');
const expressSession= require('express-session');
const flash= require("connect-flash");

const db= require('./config/mongoose.connection');
const ownersRouter= require('./routes/ownersRouter');
const usersRouter= require('./routes/usersRouter');
const productsRouter= require('./routes/productsRouter');
const indexPage= require('./routes/index');

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
    expressSession({
        resave: false, // do not save again and again, if nothing is changed
        saveUnitialized: false, // do not create session for the user didn't logged in
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/",indexPage);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);