const User = require("../models/user");

module.exports.profile = async function(req, res){
    const user = await User.findById(req.params.id);
    return res.render("user_profile.ejs", {
        title: "User Profile",
        profile_user: user
    });
};

module.exports.update = async function(req, res){
    try{
        if(req.user.id == req.params.id){
            await User.findByIdAndUpdate(req.params.id, req.body);
            const backURL = req.get("referer") || "/";
            return res.redirect(backURL);
        } else {
            return res.status(401).send("Unauthorized");
        }
    }catch(err){
        console.log("Error in updating the profile");
        const backURL = req.get("referer") || "/";
        return res.redirect(backURL);
    }
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }
    return res.render("user_sign_up", {title: "Codeial | Sign Up"});
};

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }
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
    req.flash("success", "You are logged in");
    res.redirect("/");
};

module.exports.destroySession = function(req, res){
    req.flash("success", "You are logged out");
    req.logout(function(err){
        if(err){
            return next(err);
        }
    });
    return res.redirect("/");
};