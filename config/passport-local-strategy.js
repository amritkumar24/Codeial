const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

passport.use(new LocalStrategy(
    {usernameField: "email"}, 
    async function(email, password, done){
        try{
            const user = await User.findOne({email: email});

            if (!user || user.password !== password) {
                return done(null, false, { message: 'Invalid email or password' });
            }

            return done(null, user);
        }catch(err){
            return done(err);
        }
    }
));


passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(async function(id, done){
    try{
        const user = await User.findById(id);
        done(null, user);
    }catch(err){
        done(err);
    }
});

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect("/users/sign-in");
};

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    return next();
}

module.exports = passport;