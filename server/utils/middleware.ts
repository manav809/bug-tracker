import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      token?: string | null;
      user?: any;
    }
  }
}

const userExtractor = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "");

    const user = jwt.verify(req.token, process.env.SECRET!);
    req.user = user;
  } else {
    req.token = null;
    req.user = null;
  }
  next();
};

export default userExtractor
