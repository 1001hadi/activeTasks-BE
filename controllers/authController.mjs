import User from "../models/User.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// JWt token generator
const TokenGenerator = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWTSecret, {
    expiresIn: "10d",
  });
};

// @desc   register a new user
// @route  post /api/auth/register
// @access public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl, adminInviteCode } =
      req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "all fields required!" });
    }
    // check if user exist
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ msg: "user with this email already exists!" });
    }

    // check if it has admin role & token
    let role = "user";
    if (adminInviteCode && adminInviteCode === process.env.ADMIN_INVITE_CODE) {
      role = "admin";
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
      role,
    });
    // return user data  (jwt)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
      token: TokenGenerator(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error", error: err.message });
  }
};

// @desc   login the user
// @route  post /api/auth/login
// @access public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check for valid user with email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid credential!" });
    }

    // check the password
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({ msg: "Invalid credential!" });
    }

    // return users data (jwt)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
      token: TokenGenerator(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error", error: err.msg });
  }
};

// @desc   get user profile
// @route  get /api/auth/profile
// @access privet
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "user not found!" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error", error: err.msg });
  }
};

// @desc   update the user profile
// @route  put /api/auth/profile
// @access privet
export const editUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      new: true,
      select: "-password",
    });

    if (!user) {
      return res.status(404).json({ msg: "user not found!" });
    }

    // update the users name and email
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    // update password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    // return updated data
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      token: TokenGenerator(updatedUser._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "server error", error: err.msg });
  }
};

// @desc   update the user profile
// @route  post /api/auth/upload-img
// @access privet
export const uploadFiles = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "file not uploaded!" });
  }

  const imgUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  res.status(200).json({ imgUrl });
};
