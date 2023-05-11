import { z } from "zod";

export const titleSchema = z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters long.")
    .max(30);
export const descriptionSchema = z
    .string()
    .trim()
    .min(3, "Description must be at least 3 characters long.")
    .max(500);
