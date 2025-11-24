import nodemailer from "nodemailer";

const smtpPass = process.env.SMTP_PASS?.replace(/\s/g, '') || '';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: smtpPass,
  },
});

export async function sendPasswordResetEmail(
  email: string,
  resetToken: string
) {
  const resetUrl = `${process.env.NEXTAUTH_URL}/redefinir-senha?token=${resetToken}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #b8860b 0%, #d35836 100%);
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 40px 30px;
          }
          .content p {
            margin: 0 0 20px;
            color: #57534e;
          }
          .button {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #b8860b 0%, #d35836 100%);
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            margin: 20px 0;
            transition: transform 0.2s;
          }
          .button:hover {
            transform: scale(1.02);
          }
          .footer {
            background: #faf8f5;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #ebe3d5;
          }
          .footer p {
            margin: 5px 0;
            color: #78716c;
            font-size: 14px;
          }
          .warning {
            background: #fef9e7;
            border-left: 4px solid #d4a017;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .warning p {
            margin: 0;
            color: #57534e;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🐾 Recuperação de Senha</h1>
          </div>
          <div class="content">
            <p>Olá,</p>
            <p>Recebemos uma solicitação para redefinir a senha da sua conta.</p>
            <p>Clique no botão abaixo para criar uma nova senha:</p>
            <center>
              <a href="${resetUrl}" class="button">Redefinir Senha</a>
            </center>
            <div class="warning">
              <p><strong>⚠️ Importante:</strong> Este link expira em 1 hora por questões de segurança.</p>
            </div>
            <p>Se você não solicitou a redefinição de senha, pode ignorar este email com segurança.</p>
            <p style="margin-top: 30px; font-size: 14px; color: #78716c;">
              Se o botão não funcionar, copie e cole este link no seu navegador:<br>
              <a href="${resetUrl}" style="color: #d35836; word-break: break-all;">${resetUrl}</a>
            </p>
          </div>
          <div class="footer">
            <p><strong>Canil Zannine</strong></p>
            <p>Este é um email automático, por favor não responda.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Canil Zannine" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Recuperação de Senha - Canil Zannine",
      html: htmlContent,
      text: `Olá,\n\nRecebemos uma solicitação para redefinir a senha da sua conta.\n\nClique no link abaixo para criar uma nova senha:\n${resetUrl}\n\nEste link expira em 1 hora.\n\nSe você não solicitou a redefinição de senha, pode ignorar este email.\n\nCanil Zannine`,
    });

    return { success: true };
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    throw new Error("Falha ao enviar email de recuperação");
  }
}
