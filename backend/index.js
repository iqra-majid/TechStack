import express from "express";
import connectToMongo from "./db.js";
import dotenv from "dotenv";
import signupRoute from "./routes/auth/signupRoute.js";
import loginRoutes from "./routes/auth/loginRoute.js";
import profileRoutes from './routes/profile/createProfileRoute.js'
import getprofileRoutes from './routes/profile/getProfile.js'
import getAllprofileRoutes from './routes/profile/getAllProfiles.js'
import FilteredProfiles from './routes/profile/getFilteredProfiles.js'
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url'; 
import { dirname } from 'path'; 
import imageRoutes from './routes/profile/imageRoutes.js';
dotenv.config();

const app = express();

app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['*'], // Allow all headers
}));

const PORT = process.env.PORT || 8080;

// Middleware to parse incoming requests with JSON
app.use(express.json());

// Make a connection with db
connectToMongo();

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/api", signupRoute);
app.use("/api", loginRoutes);
app.use("/api", profileRoutes);
app.use("/api", getprofileRoutes);
app.use("/api", getAllprofileRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', imageRoutes);
app.use('/api', FilteredProfiles);

app.get("/", (req, res) => {
  res.send("Welcome to the MERN stack application");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
