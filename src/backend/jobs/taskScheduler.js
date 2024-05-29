const cron = require('node-cron');
const axios = require('axios');
const mysql = require('mysql2/promise');
const webhookService = require('./webhookService');
const { WEBHOOK_URL } = process.env;

// 데이터베이스 연결 설정
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'tasks_db'
};

// 매일 자정에 시스템 상태를 확인하고 문제가 있을 경우 웹훅 알림을 보냅니다.
cron.schedule('0 0 * * *', async () => {
    console.log('매일 자정에 시스템 상태를 확인합니다.');
    const systemHealth = await checkSystemHealth();
    if (!systemHealth.ok) {
        // 시스템 상태가 정상이 아니면 웹훅을 통해 알림
        await webhookService.sendWebhookNotification(WEBHOOK_URL, {
            message: 'System health check failed',
            details: systemHealth
        });
    }
});

// 매주 일요일 오전 9시에 마감 기한이 임박한 작업을 확인하고 관련 정보를 웹훅으로 보냅니다.
cron.schedule('0 9 * * 0', async () => {
    console.log('매주 일요일 오전 9시에 마감 기한이 임박한 작업을 확인합니다.');
    const tasks = await fetchTasksWithApproachingDeadlines();
    if (tasks.length > 0) {
        // 마감 기한이 임박한 작업이 있을 경우 웹훅을 통해 알림
        await webhookService.sendWebhookNotification(WEBHOOK_URL, {
            message: 'Tasks with approaching deadlines',
            tasks: tasks
        });
    }
});

// 시스템 상태를 체크하는 함수
async function checkSystemHealth() {
    try {
        // 예: 서버 응답 시간 확인
        const response = await axios.get('https://example.com/healthcheck');
        const responseTime = response.headers['request-duration'];

        // 중요 서비스의 상태 확인 (예: 데이터베이스 연결 확인)
        const connection = await mysql.createConnection(dbConfig);
        await connection.ping();
        await connection.end();

        return { ok: true, details: "All systems operational.", responseTime: responseTime };
    } catch (error) {
        return { ok: false, details: error.message };
    }
}

// 마감 기한이 다가오는 작업을 조회하는 함수
async function fetchTasksWithApproachingDeadlines() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(`
            SELECT taskId, title, dueDate 
            FROM tasks 
            WHERE dueDate <= DATE_ADD(NOW(), INTERVAL 7 DAY)
        `);
        await connection.end();
        return rows;
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        return [];
    }
}
