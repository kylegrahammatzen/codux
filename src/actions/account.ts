"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { loginSchema, signupSchema } from "@/lib/zod-schemas";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";

export async function login(data: z.infer<typeof loginSchema>) {
  const validated = loginSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.issues,
    };
  }

  try {
    await auth.api.signInEmail({
      body: {
        email: validated.data.email,
        password: validated.data.password,
      },
      headers: await headers(),
    });

    revalidatePath("/", "layout");
    redirect("/");
  } catch (error: unknown) {
    if (error instanceof APIError) {
      return {
        success: false,
        message: error.message,
      };
    }
    throw error;
  }
}

export async function signup(data: z.infer<typeof signupSchema>) {
  const validated = signupSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.issues,
    };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        email: validated.data.email,
        password: validated.data.password,
        name: `${validated.data.firstName} ${validated.data.lastName}`,
      },
      headers: await headers(),
    });

    revalidatePath("/", "layout");
    redirect("/");
  } catch (error: unknown) {
    if (error instanceof APIError) {
      return {
        success: false,
        message: error.message,
      };
    }
    throw error;
  }
}

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });

  revalidatePath("/", "layout");
  redirect("/login");
}
