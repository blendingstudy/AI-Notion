// services/notionService.js 수정
const { Client } = require('@notionhq/client');

const { NOTION_API_KEY } = process.env;

async function getPageContent(pageId) {
  let content = '';
  let cursor = undefined;

  do {
    const { results, next_cursor } = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
    });
    results.forEach((block) => {
      if (block.type === 'paragraph' && block.paragraph.text.length > 0) {
        content += block.paragraph.text.map(text => text.plain_text).join('') + '\n';
      }
    });
    cursor = next_cursor;
  } while (cursor);

  return content.trim();
}

// 노션 클라이언트 초기화
const notion = new Client({ auth: NOTION_API_KEY });

/**
 * 지정된 노션 데이터베이스에서 최신 데이터를 가져옵니다.
 * @param {string} databaseId 가져올 데이터베이스의 ID
 * @returns {Promise} 데이터베이스에서 가져온 결과의 프라미스
 */
exports.fetchNotionData = async (databaseId) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    return response.results;
  } catch (error) {
    console.error('Error fetching data from Notion:', error);
    throw error;
  }
};




module.exports = { getPageDetails, getPageContent };