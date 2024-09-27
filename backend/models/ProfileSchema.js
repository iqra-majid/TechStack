import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    expertise: { type: [String], default: [] },
    industries: { type: [String], default: [] },
    stages: { type: [String], default: [] },
    location: { type: String, required: true },
    description: { type: String, required: true },
    languages: { type: [String], default: [] },
    profileImage: { type: String }, // Store URL or path to the image
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema); 
export default Profile;
