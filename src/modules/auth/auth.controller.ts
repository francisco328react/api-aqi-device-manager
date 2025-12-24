import { Request, Response } from "express";
import { loginSchema } from "./auth.schema";
import { AuthService } from "./auth.service";

export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const data = loginSchema.parse(req.body);

      const result = await AuthService.login(data);

      return res.json(result);
    } catch (error: any) {
      // Erro de validação do Zod
      if (error.name === "ZodError") {
        return res.status(400).json({
          message: "Dados inválidos",
          issues: error.errors,
        });
      }

      // Erro de autenticação
      return res.status(401).json({
        message: error.message || "Credenciais inválidas",
      });
    }
  }
}
