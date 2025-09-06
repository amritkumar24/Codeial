const Post = require("../models/post");
const User = require("../models/user");


module.exports.home = async function(req, res){
    try{
        const posts = await Post.find({})
            .populate("user")
            .populate({
                path: "comments",
                populate:({
                    path: "user"
                })
            });

        const users = await User.find({});
        return res.render("home.ejs", {
            title: "Home",
            posts: posts,
            all_users: users
        });
    }catch(err){
        console.log("Error in fetching posts");
        const backURL = req.get("referer") || "/";
        return res.redirect(backURL);
    }
};