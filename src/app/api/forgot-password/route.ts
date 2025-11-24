import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { generateResetToken, hashToken } from "@/lib/crypto";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email é obrigatório" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });


    if (!user) {
      return NextResponse.json({
        message: "Se o email estiver cadastrado, você receberá um link de recuperação.",
      });
    }

    const resetToken = generateResetToken();
    const hashedToken = hashToken(resetToken);

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken: hashedToken,
        resetTokenExpiry: expiryDate,
      },
    });

    try {
      await sendPasswordResetEmail(user.email, resetToken);
    } catch (emailError) {
      console.error("Erro ao enviar email:", emailError);
      return NextResponse.json(
        { error: "Erro ao enviar email. Tente novamente mais tarde." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Se o email estiver cadastrado, você receberá um link de recuperação.",
    });
  } catch (error) {
    console.error("Erro em forgot-password:", error);
    return NextResponse.json(
      { error: "Erro ao processar solicitação" },
      { status: 500 }
    );
  }
}
