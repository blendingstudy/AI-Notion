// 날짜를 읽기 쉬운 문자열로 형식화
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date);
}

// 이메일 유효성 검사
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// 객체가 빈 값 또는 null을 포함하고 있는지 검사
function isEmpty(obj) {
    return Object.values(obj).some(x => (x === null || x === ''));
}

// 기본 로깅 기능
function log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} [${level.toUpperCase()}]: ${message}`);
}

// 비동기 함수 실행과 오류 처리를 간소화
async function handleAsync(fn) {
    try {
        const result = await fn();
        return [null, result];
    } catch (error) {
        console.error('오류:', error);
        return [error, undefined];
    }
}

// 문자열 내의 모든 단어의 첫 글자를 대문자로 변환
function capitalizeWords(string) {
    return string.replace(/\b\w/g, char => char.toUpperCase());
}

// 객체의 깊은 복사
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

// 고유 식별자 생성
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

module.exports = {
    formatDate,
    isValidEmail,
    isEmpty,
    log,
    handleAsync,
    capitalizeWords,
    deepClone,
    generateUUID
};
