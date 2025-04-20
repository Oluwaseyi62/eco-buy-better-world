import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },
    
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      minlength: [5, "Password length should be greater than 5 character"],
      select: true,
    },
    profileUrl: { type: String },
    cart: {
      type: Array,
      default: [],
    },
    orders: {
      type: Array,
      default: [],
    },
    wishlist: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("User", userSchema);
export default Users;
