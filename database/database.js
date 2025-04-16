import Database from 'better-sqlite3'
import { resolve } from 'path'

const dbPath = resolve('./database.db')
const db = new Database(dbPath)

function initDatabase() {
  try {
    db.pragma('foreign_keys = ON')

    db.transaction(() => {
      db.prepare(
        `
        CREATE TABLE IF NOT EXISTS emprestimos (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT NOT NULL,
          telefone TEXT NOT NULL,
          livros TEXT NOT NULL,
          dataEmprestimo TEXT NOT NULL,
          dataDevolucao TEXT NOT NULL,
          estado TEXT DEFAULT 'pendente' CHECK(estado IN ('pendente', 'devolvido', 'atrasado'))
        )
      `
      ).run()

      db.prepare('CREATE INDEX IF NOT EXISTS idx_emprestimos_nome ON emprestimos(nome)').run()
    })()

    console.log('Banco de dados inicializado com sucesso')
  } catch (error) {
    console.error('Erro ao inicializar banco de dados:', error)
    throw error
  }
}

initDatabase()

export default db
