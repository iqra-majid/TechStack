import express from 'express';
import Profile from '../../models/ProfileSchema.js';

const router = express.Router();

// API to get filtered profiles or all profiles
router.post('/getFilteredProfiles', async (req, res) => {
  try {
    const { location, industries, expertise, category } = req.body;

    // Construct a filter object based on the provided filters
    const filter = {};
    if (location) {
      filter.location = location;
    }
    if (industries && industries.length > 0) {
      filter.industries = { $in: industries }; // Matches if any of the selected industries are present
    }
    if (expertise && expertise.length > 0) {
      filter.expertise = { $in: expertise }; // Matches if any of the selected expertise are present
    }
    if (category) {
      filter.category = category;
    }

    // Fetch filtered profiles if filters are applied
    const profiles = Object.keys(filter).length > 0 
      ? await Profile.find(filter) // Apply filters
      : await Profile.find(); // No filters applied, fetch all profiles

    res.json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
