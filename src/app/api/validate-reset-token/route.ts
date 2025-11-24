import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { hashToken } from "@/lib/crypto";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { valid: false, error: "Token ausente" },
        { status: 400 }
      );
    }

    const hashedToken = hashToken(token);

    const user = await prisma.user.findFirst({
      where: {
        resetToken: hashedToken,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { valid: false, error: "Token inválido ou expirado" },
        { status: 400 }
      );
    }

    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error("Erro ao validar token:", error);
    return NextResponse.json(
      { valid: false, error: "Erro ao validar token" },
      { status: 500 }
    );
  }
}
