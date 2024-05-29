// src/webhooks/webhookController.js
const telegramService = require('../services/telegramService');

exports.processWebhookData = (data) => {
    // 웹훅 데이터를 처리하는 로직 구현
    console.log('Processing webhook data:', data);

    // 예: 텔레그램 알림 보내기
    const message = formatMessage(data);
    const chatId = process.env.TELEGRAM_CHAT_ID; // 텔레그램 채팅 ID를 환경 변수에서 가져옵니다
    telegramService.sendMessageToUser(chatId, message);
};

function formatMessage(data) {
    // 데이터를 텔레그램 메시지 형식으로 변환
    return `Changes detected:\nCreated: ${data.created.length}\nDeleted: ${data.deleted.length}\nUpdated: ${data.updated.length}`;
}
