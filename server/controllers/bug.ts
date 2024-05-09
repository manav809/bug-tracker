import Bug from "../models/bug";
import User from "../models/user";
import { Router } from "express";
const bugRouter: Router = Router();

bugRouter.get("/", async (req, res) => {
  Bug.find({})
    .populate("assignee", { name: 1 })
    .then((result) => {
      res.status(200).json(result);
    });
});

bugRouter.post("/", async (req, res) => {
  const body = req.body;
  if (!req.user.id) {
    return res.status(401).json({ error: "Token Not Present" });
  } else if (body.assignee != req.user.id) {
    return res.status(401).json({ error: "Token Mismatch" });
  }
  if (!("story_points" in body)) {
    body.story_points = 3;
  }

  const user = await User.findById(body.assignee);

  const bug = new Bug({
    title: body.title,
    description: body.description,
    assignee: user?.id,
    story_points: body.story_points,
  });

  bug.save().then((result) => {
    if (user && user.stories) {
      user.stories = user.stories.concat(result.id);
      user.save();
    }
    res.status(201).json(result);
  });
});

export default bugRouter;
