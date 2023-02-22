const express=require('express');
// const bodyParser = require("body-parser");
const app=express();
const db=require('./config/mongoose');





app.use(express.static('./assets'));

// app.use(bodyParser.urlencoded({extended: false,}));

app.set('view engine','ejs');
app.set('views','./views')

// use express router
app.use('/', require('./routes'));

app.listen(8000,function(){
    console.log("app is running smotthly on the port 8000");
})