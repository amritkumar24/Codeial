const Post = require("../models/post");

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
        return res.render("home.ejs", {
            title: "Home",
            posts: posts
        });
    }catch(err){
        console.log("Error in fetching posts");
        const backURL = req.get("referer") || "/";
        return res.redirect(backURL);
    }
};