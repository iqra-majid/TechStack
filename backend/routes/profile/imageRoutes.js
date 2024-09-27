import express from 'express';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Create a __dirname equivalent in ES modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

router.get('/profileImage/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, '../../uploads', imageName); // Ensure the path is correct

  // Check if the file exists
  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: 'Image not found' });
    }
    // Serve the image
    res.sendFile(imagePath);
  });
});

export default router;
