import { z } from "zod";

export const signupSchema = z.object({
    name: z
        .string({
            error: "Name is required",
        })
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters"),
    email: z
        .string({
            error: "Email is required",
        })
        .trim()
        .email("Invalid email address"),

    password: z
        .string({
            error: "Password is required",
        })
        .min(8, "Password must be at least 8 characters long")
        .max(100, "Password cannot exceed 100 characters"),
});

export const signinSchema = z.object({
    email: z
        .string({
            error: "Email is required",
        })
        .trim()
        .email("Invalid email address"),

    password: z
        .string({
            error: "Password is required",
        })
        .min(8, "Password must be at least 8 characters long"),
});