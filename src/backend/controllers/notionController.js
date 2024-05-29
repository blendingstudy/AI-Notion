// controllers/notionController.js 수정
const { getPageContent } = require('../services/notionService');
const { sendMessage } = require('../services/telegramService');
const db = require('../models/databaseModel'); // 가상의 데이터베이스 모델

async function checkPageForChanges(pageId, chatId) {
  const currentPageContent = await getPageContent(pageId);

  // 데이터베이스에서 이전 페이지 내용 조회
  const lastPageContent = await db.getLastPageContent(pageId);

  // 현재 내용과 이전 내용 비교
  if (currentPageContent !== lastPageContent) {
    // 변경 사항이 있으면 사용자에게 알림
    sendMessage(chatId, `Notion 페이지의 내용에 변경 사항이 있습니다.`);
  }

  // 현재 페이지 내용을 데이터베이스에 저장
  await db.savePageContent(pageId, currentPageContent);
}

module.exports = { checkPageForChanges };
