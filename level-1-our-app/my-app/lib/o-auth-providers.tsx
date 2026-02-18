
import { GoogleIcon, AppleIcon, GitHubIcon } from "@/components/o-auth-icons"
import { ComponentProps, ElementType } from "react"

export const SUPPORTED_OAUTH_PROVIDERS = ["github", "google","apple"] as const
export type SupportedOAuthProvider = (typeof SUPPORTED_OAUTH_PROVIDERS)[number]

export const SUPPORTED_OAUTH_PROVIDER_DETAILS: Record<
  SupportedOAuthProvider,
  { name: string; Icon: ElementType<ComponentProps<"svg">> }
> = {
  apple: { name: "Apple", Icon: AppleIcon },
  google: { name: "Google", Icon: GoogleIcon},
  github: { name: "GitHub", Icon: GitHubIcon },
  
}