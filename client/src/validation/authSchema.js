// client/src/validation/authSchema.js
import { z } from 'zod';

// Schema for the registration form
export const registerSchema = z.object({
  username: z.string().min(2, "Username is required"), 
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Schema for the login form
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});