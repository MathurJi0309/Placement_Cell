const express=require('express');
const bodyParser = require("body-parser");
const cookieParser=require('cookie-parser');
const app=express();
const db=require('./config/mongoose');


app.use(express.urlencoded());

app.use(cookieParser());


app.use(express.static('./assets'));

app.use(bodyParser.urlencoded({extended: false,}));

// use express router
app.use('/', require('./routes'));

app.set('view engine','ejs');
app.set('views','./views')



app.listen(8000,function(){
    console.log("app is running smotthly on the port 8000");
})