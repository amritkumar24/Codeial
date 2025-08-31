const Post = require("../models/post");

module.exports.create = async function(req, res){
    try{
        const newPost = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        const backURL = res.get("referer") || "/";
        res.redirect(backURL);
    }catch(err){
        console.log("Error in creating post");
        const backURL = req.get("referer") || "/";
        res.redirect(backURL);
    };
};