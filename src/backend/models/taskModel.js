// src/models/userModel.js
const db = require('../config/database');

const User = {
  create: async (name, email) => {
    const sql = `INSERT INTO Users (name, email) VALUES (?, ?)`;
    return await db.execute(sql, [name, email]);
  },
  findById: async (id) => {
    const sql = `SELECT * FROM Users WHERE id = ?`;
    const [results] = await db.execute(sql, [id]);
    return results[0];
  },
  findAll: async () => {
    const sql = `SELECT * FROM Users`;
    const [results] = await db.execute(sql);
    return results;
  },
  update: async (id, name, email) => {
    const sql = `UPDATE Users SET name = ?, email = ? WHERE id = ?`;
    return await db.execute(sql, [name, email, id]);
  },
  delete: async (id) => {
    const sql = `DELETE FROM Users WHERE id = ?`;
    return await db.execute(sql, [id]);
  }
};

module.exports = User;
