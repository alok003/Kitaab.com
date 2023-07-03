const express=require('express');
const app=express();
const port = process.env.PORT || 8000;
const db=require('./config/mongoose');
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('./assets'));
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);



app.use(session({
    name: 'Kitaab.com',
    // TODO change the secret before deployment in production mode
    secret: 'confidential',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
    // store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING })
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(passport.setAuthenticatedUser);




app.use('/',require('./routes'));

app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`error loading server:${err}`);
    }
    console.log(`server running on port:${port}`);
});