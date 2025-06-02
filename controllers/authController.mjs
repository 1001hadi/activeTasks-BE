import User from "../models/User.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// JWt token generator
const TokenGenerator = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWTSecret, {
    expiresIn: "6000000",
  });

  // @desc   register a new user
  // @route  post /api/auth/register
  // @access public
  const registerUser = async (req, res) => {};

  // @desc   login the user
  // @route  post /api/auth/register
  // @access public
  const loginUser = async (req, res) => {};

  // @desc   get user profile
  // @route  get /api/auth/register
  // @access public
  const getUserProfile = async (req, res) => {};

  // @desc   update the user profile
  // @route  put /api/auth/register
  // @access public
  const editUserProfile = async (req, res) => {};
};
