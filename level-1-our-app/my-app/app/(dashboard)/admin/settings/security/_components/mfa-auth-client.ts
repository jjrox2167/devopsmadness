"use client";

import { createAuthClient } from "better-auth/react";
import { twoFactorClient } from "better-auth/client/plugins";

/**
 * Local client scoped to MFA UI. Uses the twoFactor plugin so
 * `mfaClient.twoFactor.*` is available even if the shared auth-client
 * has not registered `twoFactorClient` yet.
 *
 * Server-side: `twoFactor()` must still be added in `lib/auth.ts` and
 * the schema migrated for these endpoints to succeed.
 */
export const mfaClient = createAuthClient({
  plugins: [
    twoFactorClient({
      // Settings page only — sign-in 2FA redirect is handled elsewhere.
    }),
  ],
});

export type TwoFactorUser = {
  twoFactorEnabled?: boolean | null;
};
