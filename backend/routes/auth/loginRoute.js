import express from "express";
import User from "../../models/UserSignupSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  console.log("Login endpoint hit");
  const { email, password } = req.body;

  try {
    // Find the user by email
    let user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid credentials" });
    }

    // Create the payload
    const data = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ success: true, authToken });

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occurred");
  }
});

export default router;

