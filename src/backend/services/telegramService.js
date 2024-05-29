// services/telegramService.js
const { Telegraf } = require('telegraf');

// 텔레그램 봇 인스턴스 초기화
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// 메시지 전송 함수
function sendMessage(chatId, message) {
  bot.telegram.sendMessage(chatId, message).catch((error) => {
    console.error("Telegram sendMessage error:", error);
  });
}

module.exports = { sendMessage };
