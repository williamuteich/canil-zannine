import { unauthorizedResponse, verifyAuth } from "@/lib/auth-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ users: [], message: "ok" });
}

export async function POST(request: NextRequest) {
  const auth = await verifyAuth(request);
  if (!auth.success) return unauthorizedResponse();

  return NextResponse.json({ message: "User created" });
}