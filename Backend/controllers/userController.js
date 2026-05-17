const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");
const User = require("../models/User");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
};
const setCookie = (res, token) =>
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

const createUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
      return res.status(401).json({ success: false, message: "unauthorized " });

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user)
      return res
        .status(401)
        .json({ success: false, message: "unauthorized invalid token " });

    const { id: uid, email } = data.user;
    const { username, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const hashedPass = password ? await bcrypt.hash(password, 10) : null;
      const UserData = { uid, username, password: hashedPass, email };
      const newUser = await User.create(UserData);

      const generatedToken = generateToken(newUser);
      setCookie(res, generatedToken);

      return res.status(201).json({
        success: true,
        message: "user created successfully",
        user: newUser,
      });
    } else {
      const generatedToken = generateToken(user);
      setCookie(res, generatedToken);
        return res.status(201).json({
        success: true,
        message: "user All ready created",
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message:error.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "user logged out" });
};

const getAllUsers = async (req, res) => {
  try {
    const usrers = await User.find();
    res.send(usrers);
  } catch (error) {
    res.status(500).json({ success: false, message: "server problem" });
  }
};


const getUserProfile = async (req, res) => {
  try {

    const user = await User.findOne({email:req.userDB.email});
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const followUser = async (req, res) => {
  try {
    const targetId = req.params.id;
    const myId     = req.userDB._id;

    if (myId.toString() === targetId) {
      return res.status(400).json({ success: false, message: "You cannot follow yourself" });
    }

    const me         = await User.findById(myId);
    const targetUser = await User.findById(targetId);

    if (!targetUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (me.following.includes(targetId)) {
      return res.status(400).json({ success: false, message: "Already following" });
    }

    await User.findByIdAndUpdate(myId,     { $push: { following:    targetId } });
    await User.findByIdAndUpdate(targetId, { $push: { followedUsers: myId    } });

    res.status(200).json({ success: true, message: "Followed successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const unFollow = async (req, res) => {
  try {
    const targetId = req.params.id;
    const myId     = req.userDB._id;

    await User.findByIdAndUpdate(myId,     { $pull: { following:    targetId } });
    await User.findByIdAndUpdate(targetId, { $pull: { followedUsers: myId    } });

    res.status(200).json({ success: true, message: "Unfollowed successfully" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserProfile,
  followUser,
  unFollow,
  logout,
};
