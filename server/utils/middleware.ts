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

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.name === "CastError") {
    return res.status(404).send({ error: "malformmated id" });
  } else if (error.name === "ValidationError") {
    return res.status(404).send({ error: error.message });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return res.status(404).send({ error: "Email already Exists" });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(404).send({ error: "JWT Incorrect" });
  } else if (error.name === "TokenExpiredError") {
    return res.status(404).send({error: "Token Expired"})
  }
  next(error);
};

export default { userExtractor, errorHandler };
