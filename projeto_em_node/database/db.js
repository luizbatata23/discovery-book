const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'banco.db'), (err) => {
  if (err) console.error('Erro ao conectar:', err.message);
  else console.log('SQLite conectado');
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      tipo TEXT DEFAULT 'doador'
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS doacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      telefone TEXT NOT NULL,
      livro TEXT NOT NULL,
      quantidade INTEGER NOT NULL,
      data_envio DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;