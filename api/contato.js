import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { nome, email, whatsapp, escritorio, volume } = req.body;

  try {

    await resend.emails.send({
      from: "IntelliJus <contato@seudominio.com.br>",
      to: ["robsonraphael123@outlook.com"],
      subject: "Novo Lead: Solicitação de Demonstração",
      html: `
        <h2>Novo contato via Landing Page</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp}</p>
        <p><strong>Escritório:</strong> ${escritorio}</p>
        <p><strong>Volume de Processos:</strong> ${volume}</p>
      `
    });

    return res.status(200).json({ success: true });

  } catch (error) {

    return res.status(500).json({ error: error.message });

  }
}
