import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.mjs";

dotenv.config();

// protect routes middleware
export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWTSecret);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      res.status(401).json({ msg: "NO token, authorization declined." });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "token is not valid", err: err.message });
  }
};

// admin access middleware
export const adminAuth = (req, res, next) => {
  let adminOnly = req.user && req.user.role === "admin";
  adminOnly
    ? next()
    : res.status(403).json({ msg: "only admin can access this route" });
};
