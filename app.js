import express from "express";
import router from "./routes/authRoutes.js";
import { connectDB } from "./models/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

// Routes
app.use("/", router);

// DB connect + start server
connectDB().then(() => {
  app.listen(3000, () => console.log("Server running on port 3000 🚀"));
});
