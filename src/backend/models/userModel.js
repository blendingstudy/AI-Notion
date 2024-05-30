// src/models/taskModel.js
const db = require('../config/database');

const Task = {
  create: async (userId, description, status) => {
    const sql = `INSERT INTO Tasks (userId, description, status) VALUES (?, ?, ?)`;
    return await db.execute(sql, [userId, description, status]);
  },
  findByUserId: async (userId) => {
    const sql = `SELECT * FROM Tasks WHERE userId = ?`;
    const [results] = await db.execute(sql, [userId]);
    return results;
  },
  update: async (id, description, status) => {
    const sql = `UPDATE Tasks SET description = ?, status = ? WHERE id = ?`;
    return await db.execute(sql, [description, status, id]);
  },
  delete: async (id) => {
    const sql = `DELETE FROM Tasks WHERE id = ?`;
    return await db.execute(sql, [id]);
  }
};

module.exports = Task;
