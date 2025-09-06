const Post = require("../models/post");
const Comment = require("../models/comment");

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

module.exports.destroy = async function(req, res){
    try{
        const post = await Post.findById(req.params.id);

        if(post.user.toString() !== req.user.id){
            const backURL = res.get("referer") || "/";
            return res.redirect(backURL);
        }

        await Comment.deleteMany({post: post._id});

        await post.deleteOne();

        const backURL = req.get("referer") || "/";
        return res.redirect(backURL);

    }catch(err){
        console.log("Error in deleting the post");
        const backURL = req.get("referer") || "/";
        return res.redirect(backURL);
    }
    
};