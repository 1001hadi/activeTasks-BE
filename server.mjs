import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/conn.mjs";
import authRoutes from "./routes/authRoutes.mjs";
import userRoutes from "./routes/userRoutes.mjs";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// middleware
app.use(
  cors({
    origin: process.env.BASE_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type", "Authorization"],
  })
);

// handle db connection
connectDB();
//
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// errMiddleware

// listener
app.listen(PORT, () => {
  console.log(`Server Run on Port: ${PORT}`);
});
