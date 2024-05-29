// services/webhookService.js

const axios = require('axios');

/**
 * 웹훅 URL로 변경사항을 포함하는 HTTP POST 요청을 보냅니다.
 * @param {string} webhookUrl 웹훅 URL
 * @param {object} payload 전달할 데이터
 * @returns {Promise} HTTP 요청의 프라미스
 */
exports.sendWebhookNotification = async (webhookUrl, payload) => {
  try {
    const response = await axios.post(webhookUrl, payload);
    console.log('Webhook sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending webhook notification:', error);
    throw error;
  }
};
