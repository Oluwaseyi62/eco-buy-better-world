import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,

      minlength: [5, "Password length should be greater than 5 character"],
      select: true,
    },
    profileUrl: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
