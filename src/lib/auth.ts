import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db, client } from "@/db";
import { env } from "@/env";

// Build social providers object only if credentials are provided
const socialProviders: Record<string, any> = {};

if (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
  };
}

if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  ...(Object.keys(socialProviders).length > 0 && { socialProviders }),
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      // TODO: Implement email sending (e.g., with Resend, SendGrid, etc.)
      console.log(`Send verification email to ${user.email}: ${url}`);
      // Example with Resend:
      // await resend.emails.send({
      //   from: 'noreply@yourdomain.com',
      //   to: user.email,
      //   subject: 'Verify your email',
      //   html: `<a href="${url}">Verify Email</a>`
      // });
    },
  },
});
