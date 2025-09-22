const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");
const commentMailer = require("../mailers/comment_mailer");
const queue = require("../config/kue");

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

            const user = await User.findById(req.user._id);

            let job = queue.create("emails", {
                userEmail: user.email,
                userName: user.name,
                content: comment.content
            }).save(function(err){
                if(err){
                    console.log("Error in creating a queue", err);
                    return;
                }

                console.log("Job enqueued with id: ", job.id);
            });

            const backURL = req.get("referer") || "/";
            return res.redirect(backURL);
        }
    }catch(err){
        console.log("Error in creating comment");
        const backURL = req.get("referer") || "/";
        return res.redirect(backURL);
    }
};

module.exports.destroy = async function(req, res) {
    try{
        const comment = await Comment.findById(req.params.id);

        if(comment.user.toString() !== req.user.id){
            const backURL = req.get("referer") || "/";
            return res.redirect(backURL);
        }

        const postId = comment.post;

        await comment.deleteOne();

        await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});

        const backURL = req.get("referer") || "/";
        return res.redirect(backURL);
        
    }catch(err){
        console.log("Error in deleting the comment");
        const backURL = req.get("referer") || "/";
        res.redirect(backURL);
    }
}