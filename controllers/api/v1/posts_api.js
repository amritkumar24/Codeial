const Post = require("../../../models/post");
const Comment = require("../../../models/comment");

module.exports.index = async (req, res) => {
    try {
        const posts = await Post.find({}).
        populate("user").
        populate({
            path: "comments",
            populate: {
                path: "user"
            }
        });

        return res.status(200).json({
            message: "List of posts",
            posts: posts
        });

    }catch (err) {
        return res.status(500).json({
            message: "Error fetching posts",
            error: err.message
        });
    }
};

module.exports.destroy = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        };

        await Comment.deleteMany({post: req.params.id});

        await post.deleteOne();

        return res.status(200).json({
            message: "Post and associated comments deleted successfully"
        });

    }catch (err) {
        return res.status(500).json({
            message: "Error deleting post",
            error: err.message
        });
    }
};