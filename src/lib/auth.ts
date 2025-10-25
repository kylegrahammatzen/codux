import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db, client } from "@/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
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
