const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: "codeial"
};

passport.use(new JWTStrategy(opts, async (jwtPayLoad, done) => {
    try {
        const user = await User.findById(jwtPayLoad._id);
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }catch (err) {
        return done(err, false);
    }
}));

module.exports = passport;