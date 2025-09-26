const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const crypto = require("crypto");
const User = require("../models/user");
const env = require("./environment.js");

passport.use(new googleStrategy({
        clientID: env.google_client_id,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_callback_url
    },

    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await User.findOne({email: profile.emails[0].value});

            if(!user){
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString("hex")
                });
            }

            return done(null, user);

        }catch (err) {
            console.log("Error in google strategy-passport", err);
            return done(err, null);
        }
    }
));

module.exports = passport;