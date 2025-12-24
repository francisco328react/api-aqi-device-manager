import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Erro de validação",
      errors: err,
    });
  }

  // Error padrão
  if (err instanceof Error) {
    return res.status(500).json({
      message: err.message,
    });
  }

  // Fallback
  return res.status(500).json({
    message: "Erro interno do servidor",
  });
}
