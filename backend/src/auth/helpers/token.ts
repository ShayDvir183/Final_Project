import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IUserFullData } from "../businessLogic";
export function signToken(user: IUserFullData): string {
  const token = jwt.sign(
    {
      data: {
        ...user,
        password: null,
      },
    },
    process.env.SECRET || "mySecretForApplication1234567",
    { expiresIn: "100h" }
  );

  return token;
}

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authorization = req?.headers?.authorization;
  jwt.verify(authorization, process.env.SECRET, (err, decoded) => {
    if (err) {
      return next({ ...err, status: 401 });
    } else {
      req.userData = decoded?.data;

      return next();
    }
  });
}
