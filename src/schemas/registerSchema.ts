import { z } from 'zod'

export const usernameValidation = z
    .string()
    .min(2, "Username must be at least 2 characters ")
    .max(50, "Username must be no more than 50 characters ")


export const emailvalidation = z
    .string()
    .email("Invalid email format")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be no more than 100 characters ")

export const registerSchema = z.object({
    username: usernameValidation,
    email: emailvalidation,
    password: z.string().min(8, "Password must be at least 8 characters"),
})