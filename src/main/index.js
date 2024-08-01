import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/logo-ipameri-min.png?asset';
import db from '../../database/database.js';

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minHeight: 600,
    minWidth: 900,
    show: false,
    autoHideMenuBar: false,
    frame: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();

  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  ipcMain.handle('get-emprestimos', async () => {
    const stmt = await db.prepare('SELECT * FROM emprestimos');
    const items = stmt.all();
    return items;
  });

  ipcMain.handle('update-emprestimo', (event, item) => {
    const stmt = db.prepare('UPDATE emprestimos SET nome = ?, telefone = ?, livros = ?, dataEmprestimo = ?, dataDevolucao = ? WHERE id = ?');
    const info = stmt.run(item.nome, item.telefone, item.livros, item.dataEmprestimo, item.dataDevolucao, item.id); 
    return { changes: info.changes };
  });

  ipcMain.handle('update-estado-emprestimo', (event, item) => {
    console.log('Atualizando item:', item); 
    const stmt = db.prepare('UPDATE emprestimos SET estado = ? WHERE id = ?');
    const info = stmt.run(item.estado, item.id);
    console.log('Mudanças feitas:', info.changes); 
    return { changes: info.changes };
  });

  ipcMain.handle('delete-emprestimo', (event, id) => {
    const stmt = db.prepare('DELETE FROM emprestimos WHERE id = ?');
    const info = stmt.run(id);
    return { changes: info.changes };
  });

  ipcMain.handle('add-emprestimo', (event, item) => {
    const currentDate = new Date();
    const returnDate = new Date(item.dataDevolucao);
    let estado = 'Em andamento';

    if (currentDate > returnDate) {
      estado = 'Atrasado';
    } else if (currentDate.toDateString() === returnDate.toDateString()) {
      estado = 'Entregue';
    }

    const stmt = db.prepare('INSERT INTO emprestimos (nome, telefone, livros, dataEmprestimo, dataDevolucao, estado) VALUES (?, ?, ?, ?, ?, ?)');
    const info = stmt.run(item.nome, item.telefone, item.livros, item.dataEmprestimo, item.dataDevolucao, estado);
    return { id: info.lastInsertRowid };
  });

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
