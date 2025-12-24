import {prisma} from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginDTO } from "./auth.schema";

export class AuthService {
    static async login({ email, password }: LoginDTO) {
        const user = await prisma.user.findUnique({
            where: {email},
        })

        if(!user) {
            throw new Error("Credenciais inválidas");
        }

        const passwordMath = await bcrypt.compare(password, user.password);

        if(!passwordMath) {
            throw new Error("Credenciais inválidas");
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET não configurado");
        }

        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET!,
            {expiresIn: "1d"}
        )

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        }
    }
}