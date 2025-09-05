const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = async function(req, res){
    try{
        const post = await Post.findById(req.body.post);

        if(post){
            const comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            await post.save();

            const backURL = res.get("referer") || "/";
            res.redirect(backURL);
        }
    }catch(err){
        console.log("Error in creating comment");
        const backURL = res.get("referer") || "/";
        res.redirect(backURL);
    }
};