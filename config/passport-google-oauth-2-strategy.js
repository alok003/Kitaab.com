const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../model/users');
const passport = require('passport');


passport.use(new googleStrategy({
    clientID:'442820183929-k0vc3re2k4kusfomlne65kttbkio09ef.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL:'http://localhost:8000/doc/auth/google/callback',
    },

    async function(accessToken, refreshToken, profile, done){
        try{
            const user=await User.findOne({email:profile.emails[0].value}).exec();
            if(user){
                return done(null,user);
            }else{
                const newUser=await User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex'),
                    avatar:profile.photos[0].value || '',
                    editor:false,
                    admin:false
                });
                return done(null,newUser);
            }
        } catch(err){
            console.log('error in creating user',err);return done(err);
        }
        
    }
));

module.exports=passport;