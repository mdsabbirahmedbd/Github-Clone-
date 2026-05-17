const Social = require("../models/Social");

const AddPost = async (req, res) => {
  try {
    const { title, description, link } = req.body;
    const post = { title, description, link, owner: req.userDB._id ,  ownerUID: req.user.id };
    const createPost = await Social.create(post);
    res.status(201).json({
      success: true,
      message: "post created successfully",
      createPost,
    });
  } catch (error) {
    console.log("server errro", error);
  }
};

const GetPost = async (req, res) => {
  try {
    const filter = req.query.email ? { owner: req.userDB._id } : {};
    const posts = await Social.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.log(error);
  }
};

const UpdatePost = async (req, res) => {
   try {
    const id = req.params.id;
    const { title, description, link } = req.body;

    const updatePost = await Social.findOneAndUpdate(
      { _id: id },
      { title, description, link },
      { new: true }
    );

    if(!updatePost) return res.status(404).json({success:false,message:"post not found"});

    res.status(200).json({
      success: true,
      message: "post updated successfully",
      updatePost,
    });
      
   } catch (error) {
    
   }
};

const DeletePost = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedPost = await Social.findOneAndDelete({
      _id: id,
      owner: req.userDB._id,
    });

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
  AddPost,
  GetPost,
  UpdatePost,
  DeletePost,
};
