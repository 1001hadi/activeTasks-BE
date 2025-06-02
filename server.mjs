import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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
app.use(express.json());

// routes

// errMiddleware

// listener
app.listen(PORT, () => {
  console.log(`Server Run on Port: ${PORT}`);
});
