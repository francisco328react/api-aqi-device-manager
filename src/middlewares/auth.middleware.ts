import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenPayload extends JwtPayload {
  userId: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não informado" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ message: "Token malformado" });
  }

  const token = parts[1];

  if (!token) {
    return res.status(401).json({ message: "Token não informado" });
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET não definido");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as TokenPayload;

    req.userId = decoded.userId;

    return next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
}
