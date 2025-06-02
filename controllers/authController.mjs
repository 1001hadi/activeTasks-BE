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
export const registerUser = async (req, res) => {};

// @desc   login the user
// @route  post /api/auth/register
// @access public
export const loginUser = async (req, res) => {};

// @desc   get user profile
// @route  get /api/auth/register
// @access public
export const getUserProfile = async (req, res) => {};

// @desc   update the user profile
// @route  put /api/auth/register
// @access public
export const editUserProfile = async (req, res) => {};
