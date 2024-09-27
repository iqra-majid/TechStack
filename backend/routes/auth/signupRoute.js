import express from "express";
import User from "../../models/UserSignupSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const secpass = await bcrypt.hash(password, salt);

    //create a new user
    user = await User.create({
      password: secpass,
      email: email,
    });

    // Create the payload
    const data = {
      user: {
        email: user.email,
      },
    };

    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ success: true, authToken });
  } catch (error) {
    console.error("Error occurred during signup:", error.message); // Improved logging
    console.error("Full error object:", error); // Log full error object for more details
    console.log(error.message);
    res.status(500).send("some error occured");
  }
});

export default router;
