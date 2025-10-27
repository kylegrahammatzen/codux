"use server";

import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const checkOnboardingCompleted = async (userId: string): Promise<boolean> => {
  const result = await db
    .select({ displayUsername: user.displayUsername })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  return !!result[0]?.displayUsername;
};
