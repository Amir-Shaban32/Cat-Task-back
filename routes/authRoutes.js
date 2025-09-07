import dotenv from "dotenv";
dotenv.config();
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/db.js";
import cookieParser from "cookie-parser";

const router = Router();

// generate tokens
const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_KEY, { expiresIn: "30s" });
};
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_KEY, { expiresIn: "1d" });
};

// refresh token endpoint
router.post("/token", (req, res) => {
  const refreshtoken = req.body.token;
  if (!refreshtoken) return res.sendStatus(401);

  jwt.verify(refreshtoken, process.env.REFRESH_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    const accesstoken = generateAccessToken({ name: user.name });
    res.json({ accesstoken });
  });
});

// register
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const checkUser = await User.findOne({ username });
    if (checkUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// login
router.post("/user", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.sendStatus(401);

    const isValidPasswd = await bcrypt.compare(password, user.password);
    if (!isValidPasswd) return res.sendStatus(401);

    const accesstoken = generateAccessToken({ name: username });
    const refreshtoken = generateRefreshToken({ name: username });

    user.refreshToken = refreshtoken;
    await user.save();

    res
      .cookie("token", refreshtoken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000
      })
      .json({ accesstoken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// auth middleware
const authentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

export default router;
