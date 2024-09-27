import mongoose from "mongoose";

const userSignupSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserSignup = mongoose.model("UserSignup", userSignupSchema);
export default UserSignup;
