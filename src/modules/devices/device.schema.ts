import z from "zod";

export const deviceSchema = z.object({
    name: z.string().min(3).max(50),
    model: z.string().min(3).max(50),
    status: z.enum(["online", "offline"]),
});

export type deviceDTO = z.infer<typeof deviceSchema>;