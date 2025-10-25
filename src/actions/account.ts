"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { loginSchema, signupSchema } from "@/lib/zod-schemas";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";

export async function login(data: z.infer<typeof loginSchema>) {
  const validated = loginSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  console.log("Login:", validated.data);

  try {
    await authClient.signIn.email({
      email: validated.data.email,
      password: validated.data.password,
      fetchOptions: {
        headers: await headers(),
      },
    });

    revalidatePath("/", "layout");
    redirect("/");
  } catch (error) {
    console.error("Login error:", error);
    redirect("/error");
  }
}

export async function signup(data: z.infer<typeof signupSchema>) {
  const validated = signupSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  console.log("Signup:", validated.data);

  try {
    await authClient.signUp.email({
      email: validated.data.email,
      password: validated.data.password,
      name: validated.data.email.split("@")[0], // Use email prefix as default name
      fetchOptions: {
        headers: await headers(),
      },
    });

    // User will receive email verification
    revalidatePath("/", "layout");
    redirect("/");
  } catch (error) {
    console.error("Signup error:", error);
    redirect("/error");
  }
}

export async function signOut() {
  try {
    await authClient.signOut({
      fetchOptions: {
        headers: await headers(),
      },
    });
    revalidatePath("/", "layout");
    redirect("/login");
  } catch (error) {
    console.error("Sign out error:", error);
    redirect("/error");
  }
}
