const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.toggleLike = async function (req, res) {
    try {
        const { id, type } = req.body;
        const userId = req.user._id;

        let likeable;
        if(type === "Post") {
            likeable = await Post.findById(id).populate("likes");
        } else if (type === "Comment") {
            likeable = await Comment.findById(id).populate("likes");
        } else {
            return res.status(400).json({message: "Invalid type"});
        }

        if(!likeable) {
            return res.status(404).json({message: "likeable not found"});
        }

        let existingLike = await Like.findOne({
            user: userId,
            likeable: id,
            onModel: type
        });

        if(existingLike) {
            likeable.likes.pull(existingLike._id);
            await likeable.save();
            await existingLike.deleteOne();
            //return res.status(200).json({message: "like removed"});
            const backURL = req.get("referer") || "/";
            return res.redirect(backURL);

        } else {
            let newLike = await Like.create({
                user: userId,
                likeable: id,
                onModel: type
            });

            likeable.likes.push(newLike._id);
            await likeable.save();
            //return res.status(200).json({message: "like added"});
            const backURL = req.get("referer") || "/";
            return res.redirect(backURL);
        }
    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}