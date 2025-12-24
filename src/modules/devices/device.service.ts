import { prisma } from "../../lib/prisma";
import { deviceDTO } from "./device.schema";

export class DeviceService {
    static async findAll(userId: string) {
        return prisma.device.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" }
        });
    }

    static async create(userId: string, data: deviceDTO) {
        return prisma.device.create({
            data: {
                ...data,
                userId,
            },
        });
    }

    static async update(userId: string, deviceId: string, data: deviceDTO) {
        const device = await prisma.device.findFirst({
            where: { id: deviceId, userId }
        });

        if(!device) {
            throw new Error("Dispositivo não encontrado");
        }

        return prisma.device.update({
            where: { id: deviceId },
            data,
        });
    }

    static async delete(userId: string, deviceId: string) {
        const device = await prisma.device.findFirst({
            where: { id: deviceId, userId }
        });

        if(!device) {
            throw new Error("Dispositivo não encontrado");
        }

        await prisma.device.delete({
            where: { id: deviceId }
        })
    }
}