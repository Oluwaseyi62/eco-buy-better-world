import JWT, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req?.headers?.authorization;
  if (!authHeader || !authHeader?.startsWith("Bearer")) {
    next("Authentication failed");
  }

  const token = authHeader?.split(" ")[1] ?? null;
  if (!token) {
    next("Authentication failed");
  }
  try {
    if (token) {
      const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY as string);
      if (
        typeof userToken === "object" &&
        userToken !== null &&
        "userId" in userToken
      ) {
        req.body.user = {
          userId: (userToken as JwtPayload).userId,
        };
        next();
      } else {
        next("Authentication failed");
      }
    } else {
      next("Authentication failed");
    }
  } catch (error) {
    console.log(error);
    next("Authentication failed");
  }
};
