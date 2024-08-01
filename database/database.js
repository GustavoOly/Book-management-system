import Database from 'better-sqlite3';
import { resolve } from 'path';

const dbPath = resolve('./database/database.db');
const db = new Database(dbPath);

const createTable = `
  CREATE TABLE IF NOT EXISTS emprestimos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    telefone TEXT NOT NULL,
    livros TEXT NOT NULL,
    dataEmprestimo TEXT NOT NULL,
    dataDevolucao TEXT NOT NULL,
    estado TEXT NOT NULL
  )
`;

db.exec(createTable);

export default db;