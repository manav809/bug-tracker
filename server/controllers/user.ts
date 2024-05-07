import User from "../models/user";
import { Router } from "express";

const userRouter: Router = Router();

userRouter.post("/", async (req, res) => {
  const { name, email, role } = req.body;

  const user = new User({
    name,
    email,
    role,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

userRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

export default userRouter;