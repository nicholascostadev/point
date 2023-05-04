import { z } from "zod";

export const clerkUserIdValidator = z.string().min(1).startsWith("user_");

export const customerIdValidator = z.string().min(1).startsWith("cus_");

export const subscriptionIdValidator = z.string().min(1).startsWith("sub_");

export const projectIdValidator = z.string().min(1).cuid();

export const planValidator = z
    .string()
    .min(1)
    .startsWith("plan-")
    .transform((val) => val.split("-")[1]);
