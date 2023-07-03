const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const Admin = require('../model/admin');

passport.use(new localStrategy(
    {
      usernameField: 'username'
    },
    async function(username, password, done) {
      try {
        const admin = await Admin.findOne({ username: username });
        if(!admin||admin.password!=password){
            console.log('invalid Credentials');
            return done(null,false);
        }
        return done(null,admin);
      } catch (err) {
        return done(err);
      }
    }
  ));


passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(async function(id,done){
    try{
        const admin = await Admin.findById(id)
        return done(null,admin);
    }
    catch{
        if(err){
            console.log('error in finding the user passport');
            return done(err);
        }
    }
});

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;