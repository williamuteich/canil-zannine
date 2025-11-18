import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function verifyAuth(request: NextRequest) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  if (!token) {
    return { success: false, error: "Unauthorized" };
  }

  return { success: true, token };
}

export function unauthorizedResponse() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}