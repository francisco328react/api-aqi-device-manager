import "express-async-errors";
import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware";

import cors from "cors";
import bcrypt from "bcryptjs";

import { prisma } from "./lib/prisma";

import { authRoutes } from "./modules/auth/auth.routes";
import { deviceRoutes } from "./modules/devices/devices.routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/devices", deviceRoutes);

// usuario de teste
app.get("/seed-user", async (req, res) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: "admin@admin.com" },
  });

  if (existingUser) {
    return res.status(200).json({
      message: "Usuário admin já existe",
      user: {
        id: existingUser.id,
        email: existingUser.email,
      },
    });
  }

  const passwordHash = await bcrypt.hash("123456", 10);

  const user = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@admin.com",
      password: passwordHash,
    },
  });

  return res.status(201).json({
    message: "Usuário admin criado com sucesso",
    user: {
      id: user.id,
      email: user.email,
    },
  });
});

app.use(errorMiddleware);
