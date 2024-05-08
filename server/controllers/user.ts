import User from "../models/user";
import { Router } from "express";
import bcrypt from 'bcrypt'

const userRouter: Router = Router();

userRouter.post("/", async (req, res) => {
  const { name, email, role, password } = req.body;

  if (password.length < 3) {
    res.status(401).json({
      error: "Invalid Authentication: Password Must be at least 3 Characters"
    })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    name,
    email,
    role,
    passwordHash
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

userRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

export default userRouter;