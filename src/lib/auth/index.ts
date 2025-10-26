import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";
import { cache } from "react";
import { headers as nextHeaders } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { env } from "@/env";
import { resend } from "@/lib/resend";

const buildSocialProviders = () => {
  const providers: Record<string, any> = {};

  if (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) {
    providers.github = {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    };
  }

  if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
    providers.google = {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    };
  }

  return providers;
};

const socialProviders = buildSocialProviders();

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  ...(Object.keys(socialProviders).length > 0 && { socialProviders }),
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: user.email,
        subject: "Verify your email",
        html: `<a href="${url}">Click here to verify your email</a>`,
      });
    },
  },
  plugins: [nextCookies(), username()],
});

export type Session = typeof auth.$Infer.Session;
export type User = Session["user"];

// Auth utility functions
export const getSession = cache(async (headerObject?: Headers): Promise<Session | null> => {
  const headersToUse = headerObject || await nextHeaders();
  return await auth.api.getSession({ headers: headersToUse });
});

export const hasSession = async (headerObject?: Headers): Promise<Session> => {
  const session = await getSession(headerObject);
  if (!session) {
    redirect('/login');
  }
  return session;
};
