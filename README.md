# Telegram Calendar Weather Clean

Стабильная версия:

- бот и mini app запускаются одной командой
- без ngrok, localtunnel и cloudflared
- для Telegram нужен деплой на Render, потому что там сразу HTTPS

## Локально

```bash
npm install
cp .env.example .env
nano .env
npm start
```

В `.env`:

```env
BOT_TOKEN=твой_токен_от_BotFather
APP_URL=http://localhost:3000
```

Локально сайт:

```text
http://localhost:3000
```

## Для Telegram через Render

1. Зайди на https://render.com
2. Создай Web Service
3. Загрузи этот проект на GitHub и подключи репозиторий
4. Build Command:

```bash
npm install
```

5. Start Command:

```bash
npm start
```

6. Environment Variables:

```env
BOT_TOKEN=твой_токен_от_BotFather
APP_URL=https://твой-проект.onrender.com
```

7. Открой:

```text
https://твой-проект.onrender.com/health
```

Должно быть `ok: true`.

8. В Telegram напиши `/start`.
