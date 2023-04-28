import { z } from "zod";

export const nameSchema = z.string().min(3).max(50);
export const descriptionSchema = z.string().min(3).max(500);
