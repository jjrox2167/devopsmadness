import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { Resend } from 'resend';
import ResetPasswordEmail from "./email/ResetPasswordEmail";
import UpdatedPasswordEmail from "./email/UpdatedPasswordEmail";
import { twoFactor } from "better-auth/plugins/two-factor";

const resend = new Resend(process.env.RESEND_API_KEY);


export const auth = betterAuth({
  onAPIError: {
		throw: true,
		onError: (error, ctx) => {
			// Custom error handling
			console.error("Auth error:", error);
		},
		errorURL: "/auth/error",
		customizeDefaultErrorPage: {
			colors: {
				background: "#ffffff",
				foreground: "#000000",
				primary: "#0070f3",
				primaryForeground: "#ffffff",
				mutedForeground: "#666666",
				border: "#e0e0e0",
				destructive: "#ef4444",
				titleBorder: "#0070f3",
				titleColor: "#000000",
				gridColor: "#f0f0f0",
				cardBackground: "#ffffff",
				cornerBorder: "#0070f3"
			},
			size: {
				radiusSm: "0.25rem",
				radiusMd: "0.5rem",
				radiusLg: "1rem",
				textSm: "0.875rem",
				text2xl: "1.5rem",
				text4xl: "2.25rem",
				text6xl: "3.75rem"
			},
			font: {
				defaultFamily: "system-ui, sans-serif",
				monoFamily: "monospace"
			},
			disableTitleBorder: false,
			disableCornerDecorations: false,
			disableBackgroundGrid: false
		}
	},
  database: prismaAdapter(prisma, { 
    provider: "postgresql" 
  }),

  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
     minPasswordLength: 8,
    maxPasswordLength: 64,
    sendResetPassword: async ({user, url, token}) => {{

      await resend.emails.send({
        from: 'No Reply <no-reply@julienbrown.dev>',
        to: user.email,
        subject: "Reset Your Password",
				react: ResetPasswordEmail({
					username: user.name, 
          userEmail: user.email,
					resetUrl: url,
          token: token
          }),
      });
    }},
    onPasswordReset: async ({user}) => {{
      await resend.emails.send({
        from: 'No Reply <no-reply@julienbrown.dev>',
        to: user.email,
        subject: "Your Password Has Been Successfully Changed",
        react: UpdatedPasswordEmail({
          username: user.name, 
          userEmail: user.email,
        }),
      });
    }},
  resetPasswordTokenExpiresIn: 900,
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
appName: "My App", 
    plugins: [
        twoFactor() 
    ]});