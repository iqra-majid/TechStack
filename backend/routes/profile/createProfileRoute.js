import express from "express";
import Profile from "../../models/ProfileSchema.js";
import upload from '../../middleware/multerMiddleware.js';

const router = express.Router();

router.post(
  "/createProfile",
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const {
        fullName,
        email,
        category,
        expertise,
        industries,
        stages,
        location,
        description,
        languages,
      } = req.body;

      // Validate required fields
      if (!fullName || !email || !category || !location) {
        return res
          .status(400)
          .json({ message: "Please fill in all required fields." });
      }

      const profileImage = req.file ? req.file.path : null;

      // Create a new profile document
      const newProfile = new Profile({
        fullName,
        email,
        category,
        expertise: expertise.split(","), 
        industries: industries.split(","), 
        stages: stages.split(","), 
        location,
        description,
        languages: languages.split(","), 
        profileImage,
      });

      // Save the profile to the database
      const savedProfile = await newProfile.save();

      // Return the saved profile data
      res.status(201).json(savedProfile);
    } catch (error) {
      console.error("Error creating profile:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export default router;
