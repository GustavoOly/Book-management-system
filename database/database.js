import Database from "better-sqlite3";
import { resolve } from "node:path";

const dbPath = resolve("database.db");
const db = new Database(dbPath);

try {
  db.prepare("BEGIN TRANSACTION").run();

  db.prepare(
    `
  CREATE TABLE IF NOT EXISTS emprestimos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    telefone TEXT NOT NULL,
    livros TEXT NOT NULL,
    dataEmprestimo TEXT NOT NULL,
    dataDevolucao TEXT NOT NULL,
    estado TEXT
  ) 
  `,
  ).run();

  db.prepare("CREATE INDEX IF NOT EXISTS idx_emprestimos_nome ON emprestimos(nome)").run();
  db.prepare("CREATE INDEX IF NOT EXISTS idx_emprestimos_estado ON emprestimos(estado)").run();

  db.prepare("COMMIT").run();

  console.log("Tabela 'emprestimos' criada/verificada com sucesso.");
} catch (error) {
  db.prepare("ROLLBACK").run();
  console.error("Erro ao criar tabela:", error.message);
  throw error;
}

export default db;
