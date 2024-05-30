// utils/logger.js

/**
 * 시간과 함께 메시지를 콘솔에 로그합니다.
 * @param {string} message 로그할 메시지
 */
exports.log = (message) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  };
  
  /**
   * 시간과 함께 오류 메시지를 콘솔에 로그합니다.
   * @param {string} errorMessage 오류 메시지
   */
  exports.error = (errorMessage) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] Error: ${errorMessage}`);
  };
  