import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/lib/generated/prisma/client"
import prisma from "./prisma";


export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),  // ← prisma instance first, then options
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectURI: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/auth/callback/google`
    },
    apple: {
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!
    }
  },
  user: {
    additionalFields: {
      dateOfBirth: {
        type: "date",
        input: true,
        required: false,
      },
      language: {
        type: "string",
        input: true,
        required: false,
        defaultValue: "en",
      },
      country: {
        type: "string",
        input: true,
        required: false,
      },
      gender: {
        type: "string",
        input: true,
        required: false,
      },
    },
    changeEmail: {
      enabled: true,
      updateEmailWithoutVerification: true,
    },
  },
});