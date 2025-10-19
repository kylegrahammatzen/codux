"use server";

import { z } from "zod";
import { loginSchema } from "@/components/auth/login-form";
import { signupSchema } from "@/components/auth/signup-form";

export async function login(data: z.infer<typeof loginSchema>) {
  const validated = loginSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  // TODO: Implement actual login logic
  console.log("Login:", validated.data);

  return {
    success: true,
  };
}

export async function signup(data: z.infer<typeof signupSchema>) {
  const validated = signupSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  // TODO: Implement actual signup logic
  console.log("Signup:", validated.data);

  return {
    success: true,
  };
}
