import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";

export const newPost = async (req, res) => {
    try {
        const {caption} = req.body;
        const image = req.file;
        const authorId = req.id;
        
        if(!image) {
            return res.status(400).json({
                message: "Image required",
                success: false
            })
        }

        const optimizedImageBuffer = await sharp(image.buffer).resize({width: 700, height: 888}).toFormat('jpeg', {quality:80}).toBuffer();

        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri)
        const post = await Post.create({
            caption,
            image: cloudResponse.secure_url,
            author: authorId
        }); 

        const user = await User.findById(authorId);
        if(user) {
            user.posts.push(post._id);
            await user.save();
        }

        await post.populate({path: 'author', select: '-password'});
        return res.status(200).json({
            message: 'New post added',
            post,
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAllPost = async (req, res) => {
    try {
        const post = await Post.find().sort({createdAt: -1})
        .populate({path: 'author', select: 'username, profilePicture'})
        .populate({path: 'comments', sort: {createdAt: -1}, populate: {path: 'author', select: 'username, profilePicture'} })
        return res.status(200).json({
            post,
            success: true,
        })
    } catch (error) {
        
    }
}

export const getUserPost = async (req, res) => {
    try {
        const authorId = req.id;
        const posts = await Post.find({author: authorId}).sort({createdAt: -1})
        .populate({
            path: 'author',
            select: 'username, profilePicture'
        })
        .populate({
            path: 'comments', sort: {createdAt: -1},
            populate: {path: 'author', select: 'username, profilePicture'}
        })
        return res.status(200).json({
            posts,
            success: true,
        })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = async (req, res) => {
    try {
        const likekrneWalaUserId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message: 'Post not found', success: false});

        //like logic started
        await post.updateOne({ $addToSet: { likes: likekrneWalaUserId }})
        await post.save();

        //implement socket io for real time notification

        return res.status(200).json({message: 'Post Liked', success: true });

    } catch (error) {
        console.log(error);
    }
}

export const dislikePost = async (req, res) => {
    try {
        const likekrneWalaUserId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message: 'Post not found', success: false});

        //like logic started
        await post.updateOne({ $pull: { likes: likekrneWalaUserId }})
        await post.save();

        //implement socket io for real time notification

        return res.status(200).json({message: 'Post disliked', success: true });

    } catch (error) {
        console.log(error);
    }
}

export const addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const commenterId = req.id;
        const {text}  = req.body;
        const post = await Post.findById(postId);

        if(!text) return res.status(400).json({
            message: "text is required",
            success: false
        })

        const comment = await Comment.create({
            text,
            author: commenterId,
            post: postId
        })
        .populate({
            path: 'author',
            select: 'username, profilePicture'
        })

        post.comments.push(comment._id);
        await post.save();

        return res.status(2001).json({
            message: "comment added",
            comment,
            success: true
        })
    } catch (error) {
        
    }
}

export const getCommentsOfPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await Comment.find({ post: postId}).populate('author', 'username, profilePicture')
        if(!comments) return res.status(404).json({
            message: "no comments found for this post",
            success: false
        })
        return res.status(200).json({
            success: true,
            comments
        })
    } catch (error) {
        
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;

        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({
            message: "post not found",
            success: false
        })

        if(post.author.toString() !== authorId) return res.status(401).json({
            message: "unauthorized",
            success: false
        })

        //delete post
        await Post.findByIdAndDelete(postId)

        //remove the post id from the user post
        let user = await User.findById(authorId);
        user.posts = user.posts.filter(id => id.toString() !== postId);
        await user.save();

        //delete the associated comments
        await Comment.deleteMany({post: postId});
        return res.status(200).json({
            message: "post deleted",
            success: true
        })

    } catch (error) {
        console.log(error.message);
    }
}