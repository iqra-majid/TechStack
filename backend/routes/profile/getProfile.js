import express from 'express';
const router = express.Router();
import Profile from '../../models/ProfileSchema.js';
import jwt from 'jsonwebtoken';

router.get('/getProfile', async (req, res) => {

    // Get the token from the headers
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized if no token is present
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user by email from the decoded token
        const user = await Profile.findOne({ email: decoded.user.email }); // Change to match your user model

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // console.log(user); 
        res.json(user); // Send user data back to the frontend
    } catch (error) {
        console.error("Error fetching profile data:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
