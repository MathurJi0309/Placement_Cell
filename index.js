const express=require('express');
const bodyParser = require("body-parser");
const cookieParser=require('cookie-parser');
const app=express();
const db=require('./config/mongoose');

const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy')
const MongoStore=require('connect-mongo')(session);



app.use(express.urlencoded());

app.use(cookieParser());


app.use(express.static('./assets'));

app.use(bodyParser.urlencoded({extended: false,}));



app.set('view engine','ejs');
app.set('views','./views')


app.use(session({
    name:'palcement',
    secret:'something',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore(
        {
        mongooseConnection:db,
        autoRmove:'disable'
    },
    function(err){
        console.log(err || 'coonect-mongodb setup')
    }
    )
}))

app.use(passport.initialize());
app.use(passport.session());


// sets the authenticated user in the response
app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));


app.listen(8000,function(){
    console.log("app is running smotthly on the port 8000");
})