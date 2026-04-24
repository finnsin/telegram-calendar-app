import express from "express";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const APP_URL = process.env.APP_URL || process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (req, res) => {
  res.json({ ok: true, appUrl: APP_URL, time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Mini app работает: http://localhost:${PORT}`);
  console.log(`APP_URL: ${APP_URL}`);
});

if (!BOT_TOKEN) {
  console.log("BOT_TOKEN не найден. Бот не запущен.");
} else {
  const bot = new TelegramBot(BOT_TOKEN, { polling: true });

  bot.onText(/\/start/, async (msg) => {
    await bot.sendMessage(
      msg.chat.id,
      "Привет! Нажми кнопку ниже, чтобы открыть календарь с погодой:",
      {
        reply_markup: {
          inline_keyboard: [[
            { text: "📅 Открыть календарь", web_app: { url: APP_URL } }
          ]]
        }
      }
    );
  });

  bot.on("polling_error", (error) => console.log("Polling error:", error.message));
  console.log("Telegram bot запущен.");
}
