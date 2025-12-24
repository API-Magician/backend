import jwt from "jsonwebtoken";
import express from "express";
import User from "../models/User.js";
const public_users = express.Router();

const authenticatedUser = async (email, password) => {
  // 1️⃣ Find user by email
  const user = await User.findOne({ email });

  // 2️⃣ If user does not exist
  if (!user) {
    return null;
  }

  // 3️⃣ Compare passwords (PLAIN TEXT — temporary)
  if (user.password !== password) {
    return null;
  }

  // 4️⃣ Auth successful
  return user;
};

public_users.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  // Check if both username and password are provided
  if (!username || !password || !email)
    return res.status(400).send("Unable to register user."); //bad request

  // check dublecate users
  if (
    (await User.findOne({ name: username })) ||
    (await User.findOne({ email: email }))
  )
    return res.status(409).send("User already exists!"); //409 Conflict

  // Add the new user
  const user = new User({ name: username, password: password, email: email });
  await user.save();
  return res
    .status(200)
    .send("User successfully registered. Now you can login");
});

public_users.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if username or password is missing
  if (!email || !password) {
    return res.status(400).json({ message: "Error logging in" });
  }

  if (authenticatedUser(email, password)) {
    // Authenticate user
    // Generate JWT access token
    let accessToken = jwt.sign(
      {
        username: username, //try later with user id
      },
      process.env.JWT_SECRET,
      { expiresIn: 30 } // 30 second just for testing
    );

    return res.status(200).json({
      message: "Logged in successfully",
      token: accessToken,
    });
  } else {
    return res
      .status(401)
      .json({ message: "Invalid Login. Check username and password" });
  }
});
export const general = public_users;
