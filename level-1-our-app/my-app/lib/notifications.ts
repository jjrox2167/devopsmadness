import "server-only";

import prisma from "@/lib/prisma";

/**
 * Server-only helper. Call from Server Components, Route Handlers,
 * Server Actions, or better-auth hooks — never from "use client" files.
 */
export async function createNotification(input: {
  userId: string;
  title: string;
  body: string;
  category: string;
  href?: string;
}) {
  return prisma.notification.create({
    data: {
      userId: input.userId,
      title: input.title,
      body: input.body,
      category: input.category,
      href: input.href,
    },
  });
}