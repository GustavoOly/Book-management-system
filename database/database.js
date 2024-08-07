import Database from 'better-sqlite3';
import { resolve } from 'path';

const dbPath = resolve('./database.db');
const db = new Database(dbPath);

const createTable = `
  CREATE TABLE IF NOT EXISTS emprestimos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,\
    telefone TEXT NOT NULL,
    livros TEXT NOT NULL,
    dataEmprestimo TEXT NOT NULL,
    dataDevolucao TEXT NOT NULL,
    estado TEXT
  )
`;

db.exec(createTable);
console.log("Tabela 'emprestimos' criada/verificada com sucesso.");

export default db;