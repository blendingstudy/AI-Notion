const mysql = require('mysql2/promise');

class DatabaseService {
    constructor(config) {
        // MySQL 데이터베이스 연결 풀 생성
        this.pool = mysql.createPool(config);
    }

    // 사용자 정보 조회
    async getUser(userId) {
        const query = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await this.pool.query(query, [userId]);
        return rows[0];
    }

    // 사용자 정보 추가
    async addUser(userData) {
        const query = 'INSERT INTO users (username, email) VALUES (?, ?)';
        const [result] = await this.pool.query(query, [userData.username, userData.email]);
        return result.insertId;
    }

    // 사용자 정보 업데이트
    async updateUser(userId, updates) {
        const entries = Object.entries(updates);
        const setString = entries.map(([key, _]) => `${key} = ?`).join(', ');
        const values = entries.map(([_, value]) => value);
        
        const query = `UPDATE users SET ${setString} WHERE id = ?`;
        const [result] = await this.pool.query(query, [...values, userId]);
        return result;
    }

    // 사용자 삭제
    async deleteUser(userId) {
        const query = 'DELETE FROM users WHERE id = ?';
        const [result] = await this.pool.query(query, [userId]);
        return result;
    }

    // 특정 작업 조회
    async getTask(taskId) {
        const query = 'SELECT * FROM tasks WHERE id = ?';
        const [rows] = await this.pool.query(query, [taskId]);
        return rows[0];
    }

    // 작업 추가
    async addTask(taskData) {
        const query = 'INSERT INTO tasks (title, description, userId) VALUES (?, ?, ?)';
        const [result] = await this.pool.query(query, [taskData.title, taskData.description, taskData.userId]);
        return result.insertId;
    }

    // 작업 업데이트
    async updateTask(taskId, updates) {
        const entries = Object.entries(updates);
        const setString = entries.map(([key, _]) => `${key} = ?`).join(', ');
        const values = entries.map(([_, value]) => value);
        
        const query = `UPDATE tasks SET ${setString} WHERE id = ?`;
        const [result] = await this.pool.query(query, [...values, taskId]);
        return result;
    }

    // 작업 삭제
    async deleteTask(taskId) {
        const query = 'DELETE FROM tasks WHERE id = ?';
        const [result] = await this.pool.query(query, [taskId]);
        return result;
    }
}

module.exports = DatabaseService;
