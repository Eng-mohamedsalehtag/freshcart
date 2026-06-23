import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    rePassword: z.string(),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid phone number"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
