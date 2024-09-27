import express from 'express';
const router = express.Router();
import Profile from '../../models/ProfileSchema.js';

router.get('/getAllProfiles', async (req, res) => {
  try {
    const users = await Profile.find(); // Fetch all user profiles from the database
    console.log("from the backend");
    console.log(users);
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
