// api/send.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, phone, industry, routine } = req.body;

  if (!name || (!email && !phone)) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const BOT_TOKEN = process.env.BOT_TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  const message = `
📥 Новый лид с лендинга!
🏢 Сфера: ${industry || "—"}
🔁 Рутинные задачи: ${routine || "—"}

👤 Имя: ${name}
📧 Email: ${email || "—"}
📞 Телефон: ${phone || "—"}
🕒 Время: ${new Date().toLocaleString("ru-RU")}
  `;

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    if (!telegramRes.ok) {
      throw new Error("Ошибка отправки в Telegram");
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}