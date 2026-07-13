// app/api/location/route.ts

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Get the user's IP
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0] ?? "";

  const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IPGEOLOCATION_API_KEY}&ip=${ip}`;

  const response = await fetch(url);
  const data = await response.json();

  return NextResponse.json(data);
}