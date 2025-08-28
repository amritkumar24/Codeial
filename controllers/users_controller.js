const User = require("../models/user");

module.exports.profile = function(req, res){
    return res.render("user_profile.ejs", {title: "User Profile"});
};

module.exports.signUp = function(req, res){
    return res.render("user_sign_up", {title: "Codeial | Sign Up"});
};

module.exports.signIn = function(req, res){
    return res.render("user_sign_in", {title: "Codeial | Sign In"});
};

module.exports.create = async function(req, res){
    
    try{
        if(req.body.password != req.body.confirm_password){
            const backURL = req.get("referer") || "/";
            return res.redirect(backURL);
        }

        const user = await User.findOne({email: req.body.email});

        if(!user){
            await User.create(req.body);
            return res.redirect("/users/sign-in");
        } else {
            const backURL = req.get("referer") || "/";
            return res.redirect(backURL);
        }

    }catch(err){
        console.log("Error in signing up");
        const backURL = req.get("referer") || "/";
        return res.redirect(backURL);
    }
    
};

module.exports.createSession = function(req, res){
    // todo later
}