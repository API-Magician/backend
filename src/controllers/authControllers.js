import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  const { username, password, email } = req.body;

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
  try {
    await user.save();
  } catch (err) {
    console.error(err);
  }

  return res
    .status(200)
    .send("User successfully registered. Now you can login");
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if email or password is missing
  if (!email || !password) {
    return res.status(400).json({ message: "incomplete cerdentials" });
  }

  const candidateUser = await User.findOne({ email });

  if (!candidateUser) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isAuth = await candidateUser.comparePassword(password);
  if (!isAuth) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Generate JWT access token
  let accessToken = jwt.sign(
    {
      id: candidateUser._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: 30 * 60 }, // 30 min
  );

  return res.status(200).json({
    message: "Logged in successfully",
    token: accessToken,
  });
};
