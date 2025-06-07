import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your first name"],
      trim: true,
      minLength: [3, "Name can't be less than 3 characters long"],
      maxLength: [30, "Name can't be more than 30 characters long"],
    },
    email: {
      type: String,
      required: [true, "Please provide email address"],
      trim: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email address must be valid !",
      ],
      // to create index with mongoose
      index: true,
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Password must be 6 characters long"],
      //   match: [
      //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{8,}$/,
      //     "Password must contain 8 characters including: 1 upper case,1 number and 1 special characters(#,?,!) ",
      //   ],
    },
    profileImageUrl: {
      type: String,
      default: null,
    },
    // for role based access like admin
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },

  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
