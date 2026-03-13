import express from "express";
import cors from "cors";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"]
}));

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/api/contato", async (req, res) => {
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

    res.status(200).json({ success: true });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
});