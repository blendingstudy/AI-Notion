// controllers/telegramController.js
const { Telegraf } = require('telegraf');
const { checkPageForChanges } = require('./notionController');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// 사용자가 "/start" 명령을 보냈을 때의 반응
bot.start((ctx) => ctx.reply('안녕하세요! Notion 페이지 변경 알림 봇입니다. "/check_changes"를 입력하여 페이지 변경 사항을 확인하세요.'));

// 사용자가 "/check_changes" 명령을 보냈을 때의 반응
bot.command('check_changes', (ctx) => {
    // 여기서 'pageId'와 'chatId'는 예시 값입니다. 실제 값으로 대체해야 합니다.
    const pageId = 'your_notion_page_id_here'; // Notion 페이지 ID
    const chatId = ctx.chat.id; // 사용자의 Telegram chat ID

    // Notion 페이지 변경 사항 확인 함수 호출
    checkPageForChanges(pageId, chatId).then(() => {
        ctx.reply('페이지 변경 사항을 확인하였습니다.');
    }).catch((error) => {
        console.error(error);
        ctx.reply('오류가 발생하였습니다. 나중에 다시 시도해주세요.');
    });
});

// 봇 실행
bot.launch();