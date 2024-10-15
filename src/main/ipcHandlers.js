import { ipcMain } from 'electron';
import db from '../../database/database.js';

export function setupIpcHandlers() {
  ipcMain.handle('get-emprestimos', async () => {
    try {
      const stmt = db.prepare('SELECT * FROM emprestimos');
      const items = stmt.all();
      console.log('Emprestimos carregados:', items);
      return items;
    } catch (error) {
      console.error('Erro ao carregar emprestimos:', error);
      throw error;
    }
  });

  ipcMain.handle('update-emprestimo', async (_, item) => {
    try {
      const stmt = db.prepare('UPDATE emprestimos SET nome = ?, telefone = ?, livros = ?, dataEmprestimo = ?, dataDevolucao = ? WHERE id = ?');
      const info = stmt.run(item.nome, item.telefone, item.livros, item.dataEmprestimo, item.dataDevolucao, item.id);
      console.log('Emprestimo atualizado:', item);
      return { changes: info.changes };
    } catch (error) {
      console.error('Erro ao atualizar emprestimo:', error);
      throw error;
    }
  });

  ipcMain.handle('update-estado-emprestimo', async (_, item) => {
    try {
      console.log('Atualizando item:', item);
      const stmt = db.prepare('UPDATE emprestimos SET estado = ? WHERE id = ?');
      const info = stmt.run(item.estado, item.id);
      console.log('Mudanças feitas:', info.changes);
      return { changes: info.changes };
    } catch (error) {
      console.error('Erro ao atualizar estado do emprestimo:', error);
      throw error;
    }
  });

  ipcMain.handle('delete-emprestimo', async (_, id) => {
    try {
      const stmt = db.prepare('DELETE FROM emprestimos WHERE id = ?');
      const info = stmt.run(id);
      console.log('Emprestimo deletado:', id);
      return { changes: info.changes };
    } catch (error) {
      console.error('Erro ao deletar emprestimo:', error);
      throw error;
    }
  });

  ipcMain.handle('add-emprestimo', async (_, item) => {
    try {
      const currentDate = new Date();
      const returnDate = new Date(item.dataDevolucao);
      let estado = 'Em andamento';

      if (currentDate > returnDate) {
        estado = 'Atrasado';
      } else if (currentDate.toDateString() === returnDate.toDateString()) {
        estado = 'Em andamento';
      }
      const stmt = db.prepare('INSERT INTO emprestimos (nome, telefone, livros, dataEmprestimo, dataDevolucao, estado) VALUES (?, ?, ?, ?, ?, ?)');
      const info = stmt.run(item.nome, item.telefone, item.livros, item.dataEmprestimo, item.dataDevolucao, estado);
      return { id: info.lastInsertRowid };
    } catch (error) {
      console.error('Erro ao adicionar emprestimo:', error);
      throw error;
    }
  });
}
