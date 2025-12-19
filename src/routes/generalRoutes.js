import jwt from "jsonwebtoken";
import express from "express";
const public_users = express.Router();

const users = []; // fake db , replaced later with mongo

const authenticatedUser = (username, password) => {
  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  // Return true if any valid user is found, otherwise false
  return validusers.length > 0;
};

const doesExist = (username) => {
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  // Return true if any user with the same username is found, otherwise false
  return userswithsamename.length > 0;
};

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (!username || !password)
    return res.status(404).send("Unable to register user.");

  if (doesExist(username)) return res.status(404).send("User already exists!");

  // Add the new user to the users array
  users.push({ username: username, password: password });
  return res
    .status(200)
    .send("User successfully registered. Now you can login");
});

public_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if username or password is missing
  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  // Authenticate user
  if (authenticatedUser(username, password)) {
    // Generate JWT access token
    let accessToken = jwt.sign(
      {
        username: username,
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
