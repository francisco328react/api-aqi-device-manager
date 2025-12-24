import { Request, Response } from "express";
import { deviceSchema } from "./device.schema";
import { DeviceService } from "./device.service";

interface AuthenticatedRequest extends Request {
  userId: string;
}

export class DeviceController {
  static async index(req: AuthenticatedRequest, res: Response) {
    const devices = await DeviceService.findAll(req.userId);
    return res.json(devices);
  }

  static async create(req: AuthenticatedRequest, res: Response) {
    const data = deviceSchema.parse(req.body);
    const device = await DeviceService.create(req.userId, data);
    return res.status(201).json(device);
  }

  static async update(req: AuthenticatedRequest, res: Response) {
    const data = deviceSchema.parse(req.body);
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID do dispositivo é obrigatório" });
    }

    const device = await DeviceService.update(req.userId, id, data);
    return res.json(device);
  }

  static async delete(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID do dispositivo é obrigatório" });
    }

    await DeviceService.delete(req.userId, id);
    return res.status(204).send();
  }
}
