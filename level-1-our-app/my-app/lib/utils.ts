import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getLocation(ip: string) {
  const res = await fetch(
    `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IPGEOLOCATION_API_KEY}&ip=${ip}`,
    {
      cache: "force-cache", // or "no-store" if you want fresh data every time
    }
  );

  if (!res.ok) return null;

  return res.json();
}